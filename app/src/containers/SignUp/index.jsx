import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router-dom';

import SignUpForm from '@/components/Auth/SignUpForm';
import logo from '@/assets/images/logo.png';

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

const registerQuery = loader('../../queries/auth/register.graphql');

function SignUp() {
  const { register, handleSubmit, errors: errorsForm } = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const [registerMutation, { error, loading }] = useMutation(registerQuery);
  const history = useHistory();

  async function onSubmit(params) {
    const { data } = await registerMutation({ variables: params });
    if (data) {
      history.push('/signin');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Jslancer" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign up to connect with us
          </h2>
        </div>
        <SignUpForm
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

export default SignUp;
