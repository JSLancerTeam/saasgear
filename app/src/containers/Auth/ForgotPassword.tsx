import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import forgotpasswordQuery from '@/queries/auth/forgotPassword';
import { useMutation } from '@apollo/client';
import squareRadiusTop from '@/assets/images/svg/square-radius-top.svg';
import squareRadiusTopPrimary from '@/assets/images/svg/square-radius-top-primary.svg';
import squareRadiusTopPrimarySmall from '@/assets/images/svg/square-radius-top-primary-small.svg';
import squareGrid from '@/assets/images/svg/square-grid.svg';
import squareRadiusTopBig from '@/assets/images/svg/square-radius-top-big.svg';
import circleSmall from '@/assets/images/svg/circle-small.svg';
import useDocumentHeader from '@/hooks/useDocumentTitle';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Common.validation.require_email').email('Common.validation.valid_email'),
});

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  useDocumentHeader({ title: t('Common.title.forgot_password') });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const [forgotPasswordMutation, { loading, error }] = useMutation(
    forgotpasswordQuery,
  );

  async function onSubmit(data: { email: string }) {
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
    <div className="h-screen overflow-hidden flex w-full min-h-screen items-center justify-center relative">
      <div className="absolute h-full w-full bg-primary z-[-2]" />
      <div className="w-[762px] mx-auto my-0 text-center bg-white p-[40px] rounded-[5px] relative">
        <ForgotPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted && !error}
          isSubmitting={loading}
          apiError={error?.graphQLErrors?.[0]?.extensions?.code}
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

export default ForgotPassword;
