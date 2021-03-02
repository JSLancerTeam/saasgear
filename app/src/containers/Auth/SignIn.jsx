import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import SignInForm from '@/components/Auth/SignInForm';
import { JWT_STORAGE_KEY } from '@/constants';
import loginQuery from '@/queries/auth/login';
import { SignUpFormWrapper, SignUpFormLeft, SignUpAds } from '@/components/Auth/AuthForm';
import AuthAdsArea from '@/components/Auth/AuthAds';

const SignInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup.string().required('Password is required'),
});

function SignIn() {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const [loginMutation, { error, loading }] = useMutation(loginQuery);
  const history = useHistory();

  async function onSubmit(params) {
    try {
      const { data } = await loginMutation({ variables: params });
      if (data?.login?.token) {
        localStorage.setItem(JWT_STORAGE_KEY, data.login.token);
        history.push('/');
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  }

  return (
    <SignUpFormWrapper>
      <SignUpFormLeft>
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          formErrors={formErrors}
          apiError={error?.message}
          isSubmitting={loading}
        />
      </SignUpFormLeft>
      <SignUpAds>
        <AuthAdsArea />
      </SignUpAds>
    </SignUpFormWrapper>
  );
}

export default SignIn;
