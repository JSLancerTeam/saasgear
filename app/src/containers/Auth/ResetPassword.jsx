import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import getQueryParam from '@/utils/getQueryParam';

const ResetPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirm is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function ResetPassword() {
  const query = getQueryParam();
  const history = useHistory();
  const token = query.get('token');
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      history.push('/auth/signin');
    }
  }, [token]);

  function onSubmit() {
    history.push('/auth/signin');
  }
  return (
    <>
      <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Create new Password
      </h2>
      <ResetPasswordForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </>
  );
}

export default ResetPassword;
