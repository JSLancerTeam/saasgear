import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from 'assets/images/logo.png';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import { GetQueryParam } from '../../common';

const ForgotPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirm is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function ResetPassword() {
  const query = GetQueryParam();
  const history = useHistory();
  const token = query.get('token');
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  React.useEffect(() => {
    if (!token) {
      history.replace('/login');
    }
  }, [token]);

  function onSubmit() {
    history.push('/signin');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="JSlancer" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create new Password
          </h2>
          <h3 className="mt-6 text-base leading-9 font-extrabold text-gray-900">
            <ResetPasswordForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
            />
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
