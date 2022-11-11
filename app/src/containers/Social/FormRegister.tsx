import React from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { registerAccountBySocial } from '@/queries/auth/socialLogin';
import SignUpSocialForm from '@/components/Auth/SignUpSocialForm';

const registerSchema = yup.object().shape({
  email: yup.string().required('Common.validation.require-email').email('Common.validation.valid-email'),
});

type FormData = {
  email?: string;
}

type Props = {
  data: {
    user: {
      email: string;
      name: string;
      avatarUrl: string;
      provider: string;
      providerId: string;
    }
  }
}

const FormRegister: React.FC<Props> = ({ data }) => {
  const [registerMutation, { error }] = useMutation(registerAccountBySocial);
  const history = useHistory();
  const { t } = useTranslation();
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(registerSchema),
  });

  async function onSubmit(formdata: FormData) {
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
            {t('Common.text.hi')} {data.user.name} !!
          </h2>
          <SignUpSocialForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            formErrors={formErrors}
            errorAPI={error?.graphQLErrors?.[0]?.extensions?.code}
          />
        </div>
      </div>
    )
  );
}

export default FormRegister;