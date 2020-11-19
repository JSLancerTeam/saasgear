import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import SignInForm from '@/components/Auth/SignInForm';
import { JWT_STORAGE_KEY } from '@/constants';
import loginQuery from '@/queries/auth/login';

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
    <div>
      <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <SignInForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        formErrors={errorsForm}
        apiError={error && error.message}
        isSubmitting={loading}
      />
    </div>
  );
}

export default SignIn;
