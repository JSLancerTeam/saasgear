import React,  { useState, useEffect } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import StripeContainer from '@/containers/Stripe';
import deleteUserPlanQuery from '@/queries/userPlans/deleteUserPlan';
import updateUserPlanQuery from '@/queries/userPlans/updateUserPlan';
import createUserPlanQuery from '@/queries/userPlans/createUserPlan';
import getUserPlanQuery from '@/queries/userPlans/getUserPlan';
import { setUserPlan } from '@/features/auth/userPlan';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 75,
    desc: 'Kickstart your project with all features and code',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 295,
    desc: 'We help you get up and running even faster',
  },
]

const PlanSetting = ({ isActive }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const { data: currentPlan } = useSelector((state) => state.userPlan);
  const [deleteUserPlanMutation, { error: errorDelete, loading: isDeletingUserPlan }] = useMutation(deleteUserPlanQuery);
  const [updateUserPlanMutation, { error: errorUpdate, loading: isUpdatingUserPlan }] = useMutation(updateUserPlanQuery);
  const [createUserPlanMutation, { error: errorCreate, loading: isCreatingUserPlan }] = useMutation(createUserPlanQuery);
  const [fetchUserPlan, { data: userPlanData }] = useLazyQuery(getUserPlanQuery);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!isEmpty(currentPlan)) {
      setSelectedPlan(currentPlan.productType);
      setIsYearly(currentPlan.priceType === 'yearly');
    }
  }, [currentPlan])

  useEffect(() => {
    if (userPlanData?.getUserPlan) {
      dispatch(setUserPlan({ data: userPlanData?.getUserPlan }));
    }
  }, [userPlanData])

  function toggle() {
    setIsYearly(!isYearly);
  }

  function changePlan(name) {
    setSelectedPlan(name);
  }

  function checkIsCurrentPlan(planId) {
    return currentPlan.productType === planId && ((currentPlan.priceType === 'monthly' && !isYearly) || (currentPlan.priceType === 'yearly' && isYearly))
  }

  async function handleCancelSubscription() {
    await deleteUserPlanMutation({
      variables: { userPlanId: currentPlan.id }
    });
    setIsYearly(false);
    setSelectedPlan('');
    dispatch(setUserPlan({}));
  }

  async function createPaymentMethodSuccess(token) {
    const data = {
      paymentMethodToken: token,
      planName: planChanged.id,
      billingType: isYearly ? 'YEARLY' : 'MONTHLY',
    }
    await createUserPlanMutation({ variables: data});
    fetchUserPlan();
  }

  async function handleChangeSubcription() {
    await updateUserPlanMutation({ variables: {
      userPlanId: currentPlan.id,
      planName: planChanged.id,
      billingType: isYearly ? 'YEARLY' : 'MONTHLY',
    }});

    fetchUserPlan();
  }

  const planChanged = !!selectedPlan && plans.find(item => item.id === selectedPlan);
  const amountCurrent = currentPlan.amount || 0;
  const amountNew = planChanged ? planChanged.price : 0;

  return (
    <div className={cn('p-4', isActive ? 'block' : 'hidden')}>
      <div className="py-4 w-full">
        <div className="flex justify-center">
          <p className="font-bold mr-4">Bill Yearly</p>
          <div 
            className={cn("relative rounded-full w-12 h-6 cursor-pointer transition duration-200 ease-linear", isYearly ? 'bg-blue-500' : ' bg-gray-400')} 
            onClick={toggle} 
            aria-hidden
          >
            <label 
              htmlFor="toggle" 
              className={cn("absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer translate-x-0 border-gray-400", 
                isYearly ? 'translate-x-full border-blue-500' : 'translate-x-0 border-gray-400'
              )}
            >
              <input
                type="checkbox" id="toggle" name="toggle"
                className="appearance-none w-full h-full cursor-pointer active:outline-none focus:outline-none"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {plans.map((plan, index) => (
            <div
              className={cn("border border-gray-30 rounded-md pt-8 pb-4 px-4 w-full md:w-3/12 text-center cursor-pointer", 
                {
                  'bg-gray-50': planChanged && plan.id === planChanged.id,
                  'ml-8': index > 0,
                }
              )} 
              key={plan.id}
              aria-hidden
              onClick={() => changePlan(plan.id)}
            >
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="text-gray-700 mt-2">{plan.desc}</p>
              <div className="mt-8">
                {plan.price > 0 ? (
                  <>
                    <span className="font-bold text-4xl">${isYearly ? plan.price * 9 : plan.price}</span>
                    <span>/{isYearly ? 'year' : 'month'}</span>
                  </>
                ) : (
                  <span className="font-bold text-4xl">Free</span>
                )}
              </div>
              {checkIsCurrentPlan(plan.id) ? (
                <button disabled className="w-full cursor-default bg-blue-200 text-gray-600 py-2 rounded-md mt-8" type="button">Current plan</button>
              ) : (
                <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-8" type="button" onClick={() => changePlan(plan.id)}>Get started</button>
              )}
            </div>
          ))}
        </div>
        <div className="text-center font-semibold mt-4">
          <p>See plan details on <a className="text-blue-700" href={`${process.env.REACT_APP_LANDING_PAGE}/pricing`} target="_blank">Pricing page</a></p>
        </div>
      </div>

      {planChanged && (
        checkIsCurrentPlan(planChanged.id) ? (
          <div className="border-t border-gray-300 mt-10 pt-10 flex justify-center">
            <button 
              type="button" 
              className="w-4/12 py-2 px-4 text-sm leading-5 font-medium rounded-md text-white bg-red-500"
              disabled={isDeletingUserPlan}
              onClick={handleCancelSubscription}
            >Cancel Subcription</button>
          </div>
        ) : (
          <div className="border-t border-gray-300 mt-10 pt-10 grid grid-cols-3">
            <div className="w-full">
              <div className="mb-4">
                <p>Current subcription</p>
                <span className="font-semibold">${amountCurrent}</span>
              </div>
              <div className="mb-4">
                <p>New subcription</p>
                <span className="font-semibold">${isYearly ? amountNew * 9 : amountNew}</span>
              </div>
              <div className="mb-4">
                <p>Balance due right now</p>
                <span className="font-semibold">${Math.max((isYearly ? amountNew * 9 : amountNew) - amountCurrent, 0)}</span>
              </div>
            </div>
            <div className="col-span-2 border-l border-gray-300 flex justify-center items-center">
              {isEmpty(currentPlan) ? (
                <StripeContainer 
                  onSubmitSuccess={createPaymentMethodSuccess}
                  apiLoading={isCreatingUserPlan}
                  className="w-6/12 mx-auto"
                />
              ) : (
                <button 
                  type="button" 
                  className="w-6/12 py-2 px-4 text-sm leading-5 font-medium rounded-md text-white bg-indigo-600"
                  onClick={handleChangeSubcription}
                  disabled={isUpdatingUserPlan}
                >{isUpdatingUserPlan ? 'Please wait' : 'Change Subcription'}</button>
              )}
            </div>
          </div>
        )
      )}

      {errorCreate?.message && (
        <p className="text-red-500 text-center italic mt-4">{errorCreate.message}</p>
      )}

      {errorUpdate?.message && (
        <p className="text-red-500 text-center italic mt-4">{errorUpdate.message}</p>
      )}

      {errorDelete?.message && (
        <p className="text-red-500 text-center italic mt-4">{errorDelete.message}</p>
      )}

    </div>
  );
}

PlanSetting.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default PlanSetting;
