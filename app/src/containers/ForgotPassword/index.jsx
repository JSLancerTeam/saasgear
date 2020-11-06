import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
});

function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
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
            Forgot Password
          </h2>
        </div>
        <h3 className="mt-6 text-base leading-9 font-extrabold text-gray-900">
          Please enter your email address to recover your password
        </h3>
        <ForgotPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
