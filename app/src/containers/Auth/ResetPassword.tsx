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
import {
  ForgotPasswordWrapper,
  Overlay,
  ForgotPasswordContainer,
  SquareIconTop,
  SmallSquareBottom,
  SmallSquareTop,
  SmallSquareGrid,
  SquareIconBottom,
  CircleIcon,
} from '@/components/Auth/AuthForm';
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
    <ForgotPasswordWrapper>
      <Overlay />
      <ForgotPasswordContainer>
        <ResetPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          apiError={error?.message}
          isSubmitting={loading}
        />
        <SquareIconTop>
          <img src={squareRadiusTop} alt="" />
        </SquareIconTop>
        <SmallSquareBottom>
          <img src={squareRadiusTopPrimary} alt="" />
        </SmallSquareBottom>
        <SmallSquareTop>
          <img src={squareRadiusTopPrimarySmall} alt="" />
        </SmallSquareTop>
        <SmallSquareGrid>
          <img src={squareGrid} alt="" />
        </SmallSquareGrid>
        <SquareIconBottom>
          <img src={squareRadiusTopBig} alt="" />
        </SquareIconBottom>
        <CircleIcon>
          <img src={circleSmall} alt="" />
        </CircleIcon>
      </ForgotPasswordContainer>
    </ForgotPasswordWrapper>
  );
}

export default ResetPassword;
