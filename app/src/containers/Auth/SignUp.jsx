import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SignUpForm from '@/components/Auth/SignUpForm';
import AuthAdsArea from '@/components/Auth/AuthAds';
import registerQuery from '@/queries/auth/register';
import getQueryParam from '@/utils/getQueryParam';
import StripeContainer from '@/containers/Stripe';
import {
  SignUpFormWrapper,
  SignUpFormLeft,
  SignUpAds,
} from '@/components/Auth/AuthForm';
import useDocumentHeader from '@/hooks/useDocumentTitle';

const SignUpSchema = yup.object().shape({
  name: yup.string().required('sign-up.require-name'),
  email: yup.string().required('sign-up.require-email').email('sign-up.valid-email'),
  password: yup
    .string()
    .required('sign-up.require-password')
    .min(6, 'sign-up.min-password'),
  passwordConfirmation: yup
    .string()
    .required('sign-up.require-password-confirm')
    .oneOf([yup.ref('password'), null], 'sign-up.password-match'),
});

const SignUp = () => {
  useDocumentHeader({ title: 'Sign Up' });
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignUpSchema),
    shouldUnregister: false,
  });
  const { t } = useTranslation();
  const [registerMutation, { error, loading }] = useMutation(registerQuery);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const query = getQueryParam();
  const planName = query.get('plan');

  async function signup(params) {
    const { data } = await registerMutation({ variables: params });
    if (data?.register) {
      history.push('/');
    }
  }

  async function onSubmit(params) {
    if (planName) {
      setShowStripeForm(true);
      setFormData(params);
    } else {
      signup(params);
    }
  }

  function createPaymentMethodSuccess(token) {
    const data = {
      ...formData,
      paymentMethodToken: token,
      planName,
      billingType: query.get('isYearly') === '1' ? 'YEARLY' : 'MONTHLY',
    };
    signup(data);
  }

  function handleGoBack() {
    setShowStripeForm(false);
  }

  return (
    <SignUpFormWrapper>
      <SignUpFormLeft>
        {showStripeForm ? (
          <StripeContainer
            onSubmitSuccess={createPaymentMethodSuccess}
            onGoBack={handleGoBack}
            apiLoading={loading}
            apiError={error?.message}
          />
        ) : (
          <SignUpForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            formErrors={formErrors}
            apiError={error?.message}
            isSubmitting={loading}
            submitText={planName ? t('sign-up.next') : t('sign-up.text')}
          />
        )}
      </SignUpFormLeft>
      <SignUpAds>
        <AuthAdsArea />
      </SignUpAds>
    </SignUpFormWrapper>
  );
};

export default SignUp;
