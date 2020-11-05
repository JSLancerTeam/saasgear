import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SignInForm from 'components/Auth/SignInForm';

const SignInSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

function SignIn() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  function onSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}

export default SignIn;
