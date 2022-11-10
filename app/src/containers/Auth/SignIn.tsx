import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import SignInForm from '@/components/Auth/SignInForm';
import loginQuery from '@/queries/auth/login';
import {
  SignUpFormWrapper,
  SignUpFormLeft,
  SignUpAds,
} from '@/components/Auth/AuthForm';
import AuthAdsArea from '@/components/Auth/AuthAds';
import useDocumentHeader from '@/hooks/useDocumentTitle';

const SignInSchema = yup.object().shape({
  email: yup.string().required('common.validation.require-email').email('common.validation.valid-email'),
  password: yup.string().required('common.validation.require-password'),
});

type Payload = {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  useDocumentHeader({ title: 'Sign In' });
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const [loginMutation, { error, loading }] = useMutation(loginQuery);
  const history = useHistory();

  async function onSubmit(params: Payload) {
    try {
      const { data } = await loginMutation({ variables: params });
      if (data?.login) {
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
          apiError={error?.graphQLErrors?.[0]?.extensions?.code}
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
