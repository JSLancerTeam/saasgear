import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import SignUpForm from '@/components/Auth/SignUpForm';
import registerQuery from '@/queries/auth/register';
import getQueryParam from '@/utils/getQueryParam';
import StripeContainer from '@/containers/Stripe';
import { JWT_STORAGE_KEY } from '@/constants';

const SignUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  agreement: yup
    .bool()
    .oneOf([true], 'You must agree with our Privacy Policy')
    .required(),
});

const SignUp = () => {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignUpSchema),
    shouldUnregister: false,
  });
  const [registerMutation, { error, loading }] = useMutation(registerQuery);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const query = getQueryParam();
  const planName = query.get('plan');

  async function signup(params) {
    const { data } = await registerMutation({ variables: params });
    if (data?.register?.token) {
      localStorage.setItem(JWT_STORAGE_KEY, data.register.token);
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
    }
    signup(data);
  }

  function handleGoBack() {
    setShowStripeForm(false);
  }

  return (
    <>
      <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        {showStripeForm
          ? 'Enter payment information'
          : 'Sign up to connect with us'}
      </h2>
      {showStripeForm ? (
        <StripeContainer 
          onSubmitSuccess={createPaymentMethodSuccess}
          className="mt-8 shadow overflow-hidden sm:rounded-md px-4 bg-white sm:p-6"
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
          submitText={planName ? 'Next' : 'Sign up'}
        />
      )}
    </>
  );
}

export default SignUp;
