import React from 'react';

import SignInForm from '@/components/Auth/SignInForm';
import {
  SignUpFormWrapper,
  SignUpFormLeft,
  SignUpAds,
} from '@/components/Auth/AuthForm';
import AuthAdsArea from '@/components/Auth/AuthAds';
import useDocumentHeader from '@/hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';


function SignIn() {
  const { t } = useTranslation();
  useDocumentHeader({ title: t('common.title.sign-in') });


  return (
    <SignUpFormWrapper>
      <SignUpFormLeft>
        <SignInForm />
      </SignUpFormLeft>
      <SignUpAds>
        <AuthAdsArea />
      </SignUpAds>
    </SignUpFormWrapper>
  );
}

export default SignIn;
