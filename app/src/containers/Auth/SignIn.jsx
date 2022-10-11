import React from 'react';

import SignInForm from '@/components/Auth/SignInForm';
import {
  SignUpFormWrapper,
  SignUpFormLeft,
  SignUpAds,
} from '@/components/Auth/AuthForm';
import AuthAdsArea from '@/components/Auth/AuthAds';
import useDocumentHeader from '@/hooks/useDocumentTitle';


function SignIn() {
  useDocumentHeader({ title: 'Sign In' });


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
