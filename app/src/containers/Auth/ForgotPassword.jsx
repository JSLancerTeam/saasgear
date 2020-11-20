import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import forgotpasswordQuery from '@/queries/auth/forgotPassword';
import { useMutation } from '@apollo/react-hooks';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required().email(),
});

function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const [forgotPasswordMutation, { loading, error }] = useMutation(
    forgotpasswordQuery,
  );

  async function onSubmit(data) {
    setIsSubmitted(false);
    try {
      await forgotPasswordMutation({ variables: data });
      setIsSubmitted(true);
    } catch (e) {
      console.log(e);
      setIsSubmitted(false);
    }

  }

  return (
    <>
      <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Forgot Password
      </h2>
      <ForgotPasswordForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitted={isSubmitted && !error}
        isSubmitting={loading}
        apiError={error && error.message}
      />
    </>
  );
}

export default ForgotPassword;
