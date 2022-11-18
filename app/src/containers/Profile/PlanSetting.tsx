import React,  { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useTranslation, Trans } from 'react-i18next';

import { RootState } from '@/config/store';
import StripeContainer from '@/containers/Stripe';
import deleteUserPlanQuery from '@/queries/userPlans/deleteUserPlan';
import updateUserPlanQuery from '@/queries/userPlans/updateUserPlan';
import createUserPlanQuery from '@/queries/userPlans/createUserPlan';
import getUserPlanQuery from '@/queries/userPlans/getUserPlan';
import { setUserPlan } from '@/features/auth/userPlan';
import Plans from '@/components/Plans';
import Toggle from '@/components/Common/Input/Toggle';
import ErrorText from '@/components/Common/ErrorText';
import Button from '@/components/Common/Button';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 75,
    desc: 'Kickstart your project with all features and code',
    features: [
      'Save weeks of development time.',
      'Full source code download.',
      'Self-service documentation.',
      'Slack community support',
      'One year of product updates',
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 295,
    desc: 'We help you get up and running even faster',
    features: [
      'Everything in the Starter plan.',
      'One-on-one onboarding and setup.',
      'Design consulting session with you/your team.',
      'Customized code working towards your MVP',
      'Production deployment to a VPS of your choice',
      'Automated server setup and deploy scripts',
    ]
  },
];

const PlanSetting: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const { data: currentPlan } = useSelector((state: RootState) => state.userPlan);
  const [deleteUserPlanMutation, { error: errorDelete, loading: isDeletingUserPlan }] = useMutation(deleteUserPlanQuery);
  const [updateUserPlanMutation, { error: errorUpdate, loading: isUpdatingUserPlan }] = useMutation(updateUserPlanQuery);
  const [createUserPlanMutation, { error: errorCreate, loading: isCreatingUserPlan }] = useMutation(createUserPlanQuery);
  const [fetchUserPlan, { data: userPlanData }] = useLazyQuery(getUserPlanQuery);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  function changePlan(name: string) {
    setSelectedPlan(name);
  }

  function checkIsCurrentPlan(planId: string) {
    return currentPlan.productType === planId && ((currentPlan.priceType === 'monthly' && !isYearly) || (currentPlan.priceType === 'yearly' && isYearly))
  }

  async function handleCancelSubscription() {
    await deleteUserPlanMutation({
      variables: { userPlanId: currentPlan.id }
    });
    fetchUserPlan();
  }

  async function createPaymentMethodSuccess(token: string) {
    if (!planChanged) return;
    const data = {
      paymentMethodToken: token,
      planName: planChanged.id,
      billingType: isYearly ? 'YEARLY' : 'MONTHLY',
    }
    await createUserPlanMutation({ variables: data});
    fetchUserPlan();
  }

  async function handleChangeSubcription() {
    if (!planChanged) return;
    await updateUserPlanMutation({ variables: {
      userPlanId: currentPlan.id,
      planName: planChanged.id,
      billingType: isYearly ? 'YEARLY' : 'MONTHLY',
    }});

    fetchUserPlan();
  }

  const planChanged = plans.find(item => item.id === selectedPlan);
  const amountCurrent = currentPlan.amount || 0;
  const amountNew = planChanged ? planChanged.price : 0;

  return (
    <div className="bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6">
      <h5 className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-1">{t('Profile.text.plan')}</h5>
      <p className="text-[16px] leading-[26px] text-white_gray mb-[14px]">{t('Profile.text.plan_desc')}</p>
      <div className="flex justify-between sm:flex-col-reverse">
        <div>
          <div className="flex justify-center mb-[25px] sm:mt-[25px] [&_label]:mx-auto [&_label]:my-0">
            <Toggle onChange={toggle} label="Bill Yearly" />
          </div>
          <Plans
            plans={plans}
            onChange={changePlan}
            planChanged={planChanged}
            isYearly={isYearly}
            checkIsCurrentPlan={checkIsCurrentPlan}
          />
        </div>
        {planChanged && (
          <div className="pl-6 pt-[74px] flex sm:p-0 sm:flex-col-reverse">
            {checkIsCurrentPlan(planChanged.id) ? (
              <div className="min-w-[300px] [&_button]:w-full">
                {currentPlan.deletedAt ? (
                  <p>Plan will expire on <b>{dayjs(currentPlan.expiredAt).format('YYYY-MM-DD HH:mm')}</b>
                    <Trans
                      components={[<b></b>]}
                      values={{ data: dayjs(currentPlan.expiredAt).format('YYYY-MM-DD HH:mm') }}
                    >
                      {t('Profile.text.expire')}
                    </Trans>
                  </p>
                ) : (
                  <Button
                    color="primary"
                    disabled={isDeletingUserPlan}
                    onClick={handleCancelSubscription}
                  >{t('Profile.text.cancel_sub')}</Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col min-w-[300px]">
                <div className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-6">{t('Profile.text.order_sumary')}</div>
                <ul className="flex-grow">
                  <li className="flex justify-between items-center list-none mb-4">
                    <p className="text-[16px] leading-[26px] text-white_gray flex-grow">{t('Profile.text.curreny_sub')}</p>
                    <span className="font-bold text-[18px] leading-6 text-sapphire_blue">${amountCurrent}</span>
                  </li>
                  <li className="flex justify-between items-center list-none mb-4">
                    <p className="text-[16px] leading-[26px] text-white_gray flex-grow">{t('Profile.text.new_sub')}</p>
                    <span className="font-bold text-[18px] leading-6 text-sapphire_blue">${isYearly ? amountNew * 9 : amountNew}</span>
                  </li>
                  <li className="flex justify-between items-center list-none mb-4">
                    <p className="text-[16px] leading-[26px] text-white_gray flex-grow">{t('Profile.text.balance_due')}</p>
                    <span className="font-bold text-[18px] leading-6 text-sapphire_blue">${Math.max((isYearly ? amountNew * 9 : amountNew) - amountCurrent, 0)}</span>
                  </li>
                </ul>
                {(isEmpty(currentPlan) || (currentPlan && currentPlan.deletedAt)) ? (
                  <StripeContainer
                    onSubmitSuccess={createPaymentMethodSuccess}
                    apiLoading={isCreatingUserPlan}
                    submitText={currentPlan && currentPlan.deletedAt && t('Profile.text.change_plan') as string}
                  />
                ) : (
                  <Button
                    color="primary"
                    onClick={handleChangeSubcription}
                    disabled={isUpdatingUserPlan}
                  >{isUpdatingUserPlan ? t('Common.text.please_wait') : t('Profile.text.change_sub')}</Button>
                )}
              </div>
            )}

            {errorCreate?.message && (
              <ErrorText message={errorCreate.message} />
            )}

            {errorUpdate?.message && (
              <ErrorText message={errorUpdate.message} />
            )}

            {errorDelete?.message && (
              <ErrorText message={errorDelete.message} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanSetting;
