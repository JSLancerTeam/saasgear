import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import forgotpasswordQuery from '@/queries/auth/forgotPassword';
import { useMutation } from '@apollo/react-hooks';
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

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
});

const ForgotPassword = () => {
  useDocumentHeader({ title: 'Forgot password' });

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
    <ForgotPasswordWrapper>
      <Overlay />
      <ForgotPasswordContainer>
        <ForgotPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted && !error}
          isSubmitting={loading}
          apiError={error?.message}
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

export default ForgotPassword;
