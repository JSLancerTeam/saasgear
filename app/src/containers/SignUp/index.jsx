import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import SignUpForm from '@/components/Auth/SignUpForm';
import logo from '@/assets/images/logo.png';
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

function SignUp() {
  const { register, handleSubmit, errors: errorsForm } = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const [registerMutation, { error, loading }] = useMutation(registerQuery);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const history = useHistory();
  const query = getQueryParam();
  const planName = query.get('plan');

  async function onSubmit(params) {
    if (planName) {
      params = {
        ...params,
        planName,
        billingType: query.get('isYearly') === '1' ? 'YEARLY' : 'MONTHLY',
      };
    }
    const { data } = await registerMutation({ variables: params });
    if (data && data.register && data.register.token) {
      localStorage.setItem(JWT_STORAGE_KEY, data.register.token);

      if (planName) {
        setShowStripeForm(true);
      } else {
        history.push('/');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Jslancer" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            {showStripeForm
              ? 'Enter payment information'
              : 'Sign up to connect with us'}
          </h2>
        </div>
        {showStripeForm ? (
          <StripeContainer planName={planName} />
        ) : (
          <SignUpForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errorsForm={errorsForm}
            errorAPI={error && error.message}
            isSubmitting={loading}
            submitText={planName ? 'Next' : 'Sign up'}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
