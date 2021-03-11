import React,  { useState, useEffect } from 'react';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import styled from 'styled-components';

import StripeContainer from '@/containers/Stripe';
import deleteUserPlanQuery from '@/queries/userPlans/deleteUserPlan';
import updateUserPlanQuery from '@/queries/userPlans/updateUserPlan';
import createUserPlanQuery from '@/queries/userPlans/createUserPlan';
import getUserPlanQuery from '@/queries/userPlans/getUserPlan';
import { setUserPlan } from '@/features/auth/userPlan';
import Plans from '@/components/Plans';
import Toggle from '@/components/Common/Input/Toggle';
import { ContentPage, DescContent, TitleContent } from '@/components/Layout/blockStyle';
import { COLORS } from '@/constants/style';
import ErrorText from '@/components/Common/ErrorText';

const TitleContentStyle = styled(TitleContent)`
  margin-bottom: 4px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleYearly = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  label {
    margin: 0 auto;
  }
`;

const LeftContent = styled.div``;
const RightContent = styled.div`
  padding-left: 24px;
  padding-top: 74px;
  display: flex;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-bottom: 24px;
`;

const AmountList = styled.ul`
  flex-grow: 1;
`;
const AmountItem = styled.li`
  list-style-type: none;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AmoutText = styled.p`
  font-size: 16px;
  line-height: 26px;
  color: ${COLORS.WHITE_GRAY};
  flex-grow: 1;
`;
const Amount = styled.span`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: ${COLORS.SAPPHIRE_BLUE};
`;

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

const PlanSetting = () => {
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
    fetchUserPlan();
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

  const planChanged = !!selectedPlan && plans.find(item => item.id === selectedPlan) || {};
  const amountCurrent = currentPlan.amount || 0;
  const amountNew = planChanged ? planChanged.price : 0;

  return (
    <ContentPage>
      <TitleContentStyle>Plan</TitleContentStyle>
      <DescContent>This is your subscription</DescContent>
      <Content>
        <LeftContent>
          <ToggleYearly>
            <Toggle onChange={toggle} label="Bill Yearly" />
          </ToggleYearly>
          <Plans
            plans={plans}
            onChange={changePlan}
            planChanged={planChanged}
            isYearly={isYearly}
            checkIsCurrentPlan={checkIsCurrentPlan}
          />
        </LeftContent>
        {!isEmpty(planChanged) && (
          <RightContent>
            {checkIsCurrentPlan(planChanged.id) ? (
              <div>
                {currentPlan.deletedAt ? (
                  <p>Plan will expire on <b>{dayjs(currentPlan.expiredAt).format('YYYY-MM-DD HH:mm')}</b></p>
                ) : (
                  <button 
                    type="button" 
                    disabled={isDeletingUserPlan}
                    onClick={handleCancelSubscription}
                  >Cancel Subcription</button>
                )}
              </div>
            ) : (
              <PaymentWrapper>
                <SummaryTitle>Order Summary</SummaryTitle>
                <AmountList>
                  <AmountItem>
                    <AmoutText>Current subcription</AmoutText>
                    <Amount>${amountCurrent}</Amount>
                  </AmountItem>
                  <AmountItem>
                    <AmoutText>New subcription</AmoutText>
                    <Amount>${isYearly ? amountNew * 9 : amountNew}</Amount>
                  </AmountItem>
                  <AmountItem>
                    <AmoutText>Balance due right now</AmoutText>
                    <Amount>${Math.max((isYearly ? amountNew * 9 : amountNew) - amountCurrent, 0)}</Amount>
                  </AmountItem>
                </AmountList>
                {(isEmpty(currentPlan) || (currentPlan && currentPlan.deletedAt)) ? (
                  <StripeContainer 
                    onSubmitSuccess={createPaymentMethodSuccess}
                    apiLoading={isCreatingUserPlan}
                    submitText={currentPlan && currentPlan.deletedAt && 'Change plan'}
                  />
                ) : (
                  <button 
                    type="button"
                    onClick={handleChangeSubcription}
                    disabled={isUpdatingUserPlan}
                  >{isUpdatingUserPlan ? 'Please wait' : 'Change Subcription'}</button>
                )}
              </PaymentWrapper>
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
          </RightContent>
        )}
      </Content>
    </ContentPage>
  );
}

export default PlanSetting;
