import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm';
import logo from 'assets/images/logo.png';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
});

function ForgotPassword() {
  const [submited, setSubmited] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  function onSubmit(data) {
    console.log(data);
    setSubmited(!submited);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="JSlancer" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        {!submited ? (
          <>
            <h3 className="mt-6 text-base leading-9 font-extrabold text-gray-900">
              Please enter your email address that you used to register. We
              &apos;ll send you an email with a link to reset your password
            </h3>
            <ForgotPasswordForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
            />
          </>
        ) : (
          <div className="rounded shadow px-4 py-2 mt-6 bg-gray-200">
            <h3 className="text-base leading-9 font-extrabold text-gray-900">
              We&apos;ve sent you an email with a link to reset password. Please
              check your email so create new password
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
