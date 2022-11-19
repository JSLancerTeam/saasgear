import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import getQueryParam from '@/utils/getQueryParam';
import resetPasswordQuery from '@/queries/auth/resetPassword';

import squareRadiusTop from '@/assets/images/svg/square-radius-top.svg';
import squareRadiusTopPrimary from '@/assets/images/svg/square-radius-top-primary.svg';
import squareRadiusTopPrimarySmall from '@/assets/images/svg/square-radius-top-primary-small.svg';
import squareGrid from '@/assets/images/svg/square-grid.svg';
import squareRadiusTopBig from '@/assets/images/svg/square-radius-top-big.svg';
import circleSmall from '@/assets/images/svg/circle-small.svg';
import useDocumentHeader from '@/hooks/useDocumentTitle';

const ResetPasswordSchema = yup.object().shape({
  password: yup.string().required('Common.validation.require_password'),
  passwordConfirmation: yup
    .string()
    .required('Common.validation.require_password_confirm')
    .oneOf([yup.ref('password'), ""], 'Common.validation.password_match'),
});

type Payload = {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  useDocumentHeader({ title: t('Common.title.reset_password') });
  const query = getQueryParam();
  const history = useHistory();
  const token = query.get('token');
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const [loginMutation, { error, loading }] = useMutation(resetPasswordQuery);

  useEffect(() => {
    if (!token) {
      history.push('/auth/signin');
    }
  }, [token]);

  async function onSubmit({ password, passwordConfirmation }: Payload) {
    const { data } = await loginMutation({
      variables: {
        token,
        password,
        confirmPassword: passwordConfirmation,
      },
    });
    if (data?.resetPassword) {
      toast.success(t('Common.status.change_password_success'));
      history.push('/auth/signin');
    }
  }
  return (
    <div className="h-screen overflow-hidden flex w-full min-h-screen items-center justify-center relative">
      <div className="absolute w-full h-full bg-primary z-[-2]" />
      <div className="w-[762px] mx-auto my-0 text-center bg-white p-10 rounded-[5px] relative">
        <ResetPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          apiError={error?.message}
          isSubmitting={loading}
        />
        <div className="absolute w-[495px] h-[480px] left-[-400px] top-[-175px] z-[-1]">
          <img src={squareRadiusTop} alt="" />
        </div>
        <div className="absolute w-[195px] h-[195px] left-[-60px] bottom-[-25px] z-[-1]">
          <img src={squareRadiusTopPrimary} alt="" />
        </div>
        <div className="absolute w-[114px] h-[121px] top-[-57px] right-[-54px] z-[-1]">
          <img src={squareRadiusTopPrimarySmall} alt="" />
        </div>
        <div className="absolute w-[129px] h-[121px] top-[-105px] right-[-300px]">
          <img src={squareGrid} alt="" />
        </div>
        <div className="absolute w-[593px] h-[528px] right-[-400px] bottom-[-190px] z-[-1]">
          <img src={squareRadiusTopBig} alt="" />
        </div>
        <div className="absolute w-[58px] h-[58px] bottom-[-26px] right-[164px] z-[-1]">
          <img src={circleSmall} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
