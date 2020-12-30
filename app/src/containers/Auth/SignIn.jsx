import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import SignInForm from '@/components/Auth/SignInForm';
import { JWT_STORAGE_KEY } from '@/constants';
import loginQuery from '@/queries/auth/login';
import getQueryParam from "@/utils/getQueryParam";

import FaceBookSvg from '@/assets/images/svg/facebook.svg';
import GoogleSvg from '@/assets/images/svg/google.svg';
import GithubSvg from '@/assets/images/svg/github.svg';

const SignInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup.string().required('Password is required'),
});

const LineThroughText = styled.div`
  color: rgba(156, 163, 175);
  text-align: center;
  position: relative;
  &:before {
    content: '';
    width: 32%;
    height: 3px;
    position: absolute;
    background-color: rgb(156 163 175 / 38%);
    top: 45%;
    left: 0px;
  }
  &:after {
    content: '';
    width: 32%;
    height: 3px;
    position: absolute;
    background-color: rgb(156 163 175 / 38%);
    top: 45%;
    right: 0px;
  }
`;

const SocialButton = styled.a`
  border: 1px solid rgb(156 163 175 / 38%);
  border-radius: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SignIn() {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const [loginMutation, { error, loading }] = useMutation(loginQuery);
  const history = useHistory();
  const query = getQueryParam();
  const invitationToken = query.get('invitation');

  const socialButton = useMemo(
    () => [
      {
        name: 'Facebook',
        logo: FaceBookSvg,
        url: `https://www.facebook.com/v9.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_CLIENT_KEY}&redirect_uri=${window.location.origin}/social/facebook/callback&scope=email`,
      },
      {
        name: 'Google',
        logo: GoogleSvg,
        url: `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${window.location.origin}/social/google/callback&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}`,
      },
      {
        name: 'Github',
        logo: GithubSvg,
        url: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_KEY}&scope=user`,
      },
    ],
    [],
  );

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          formErrors={formErrors}
          apiError={error?.message}
          isSubmitting={loading}
        />
        <div className="my-3">
          <LineThroughText>Or continue with</LineThroughText>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {socialButton.map((btn) => (
            <SocialButton
              className="cursor-pointer hover:bg-gray-300"
              key={`social-btn-${btn.name}`}
              href={btn.url}
            >
              <img src={btn.logo} alt={`${btn.name}-icon`} />
            </SocialButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
