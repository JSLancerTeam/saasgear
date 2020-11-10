import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router-dom';

import SignInForm from 'components/Auth/SignInForm';
import logo from 'assets/images/logo.png';
import { JWT_STORAGE_KEY } from 'constants/index';

const loginQuery = loader('../../queries/auth/login.graphql');

const SignInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup.string().required('Password is required'),
});

function SignIn() {
  const { register, handleSubmit, errors: errorsForm } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const [loginMutation, { error, loading }] = useMutation(loginQuery);
  const history = useHistory();

  async function onSubmit(params) {
    const { data } = await loginMutation({ variables: params });
    if (data && data.login && data.login.token) {
      localStorage.setItem(JWT_STORAGE_KEY, data.login.token);
      history.push('/');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="JSlancer" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errorsForm={errorsForm}
          errorAPI={error && error.message}
          isSubmitting={loading}
        />
      </div>
    </div>
  );
}

export default SignIn;
