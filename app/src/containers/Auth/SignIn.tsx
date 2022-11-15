import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import SignInForm from '@/components/Auth/SignInForm';
import loginQuery from '@/queries/auth/login';
import AuthAdsArea from '@/components/Auth/AuthAds';
import useDocumentHeader from '@/hooks/useDocumentTitle';

const SignInSchema = yup.object().shape({
  email: yup.string().required('Common.validation.require_email').email('Common.validation.valid_email'),
  password: yup.string().required('Common.validation.require_password'),
});

type Payload = {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  useDocumentHeader({ title: t('Common.title.sign_in') });
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
    <div className='flex justify-center min-h-screen sm:flex-col sm:pt-[40px]'>
      <div className='w-[45%] flex justify-center items-center sm:w-full'>
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          formErrors={formErrors}
          apiError={error?.graphQLErrors?.[0]?.extensions?.code}
          isSubmitting={loading}
        />
      </div>
      <div className='w-[55%] bg-primary overflow-hidden sm:hidden'>
        <AuthAdsArea />
      </div>
    </div>
  );
}

export default SignIn;
