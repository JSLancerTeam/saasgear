import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import PropsType from 'prop-types';

import { registerAccountBySocial } from '@/queries/auth/socialLogin';
import SignUpSocialForm from '@/components/Auth/SignUpSocialForm';

const registerSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
});

export default function FormRegister({ data }) {
  const [registerMutation, { error }] = useMutation(registerAccountBySocial);
  const history = useHistory();
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(registerSchema),
  });

  async function onSubmit(formdata) {
    const params = {
      provider: data.user.provider.toUpperCase(),
      providerId: data.user.providerId,
      avatarUrl: data.user.avatarUrl,
      name: data.user.name,
      email: formdata.email,
    };
    const registerResponse = await registerMutation({ variables: params });

    if (registerResponse.data?.registerSocialAccount) {
      history.push('/');
    }
  }
  console.log(error);
  return (
    data?.user && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <img
            src={data.user.avatarUrl}
            alt="avatar"
            className="rounded-full h-64 w-64 mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Hi {data.user.name} !!
          </h2>
          <SignUpSocialForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            formErrors={formErrors}
            errorAPI={error?.message}
          />
        </div>
      </div>
    )
  );
}
FormRegister.propTypes = {
  data: PropsType.shape({
    user: PropsType.shape({
      email: PropsType.string,
      name: PropsType.string,
      avatarUrl: PropsType.string,
      provider: PropsType.string,
      providerId: PropsType.string,
    }),
  }),
};
