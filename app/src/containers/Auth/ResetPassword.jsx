import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

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
  const [loginMutation, { error, loading }] = useMutation(resetPasswordQuery);

  useEffect(() => {
    if (!token) {
      history.push('/auth/signin');
    }
  }, [token]);

  async function onSubmit({ password, passwordConfirmation }) {
    const { data } = await loginMutation({
      variables: {
        token,
        password,
        confirmPassword: passwordConfirmation,
      },
    });
    if (data?.ResetPassword) {
      history.push('/auth/signin');
    }
  }
  return (
    <>
      <ForgotPasswordWrapper>
        <Overlay />
        <ForgotPasswordContainer>
          <ResetPasswordForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            apiError={error?.message}
            isSubmiting={loading}
          />
          <SquareIconTop>
            <svg width="496" height="482" viewBox="0 0 496 482" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H445C472.614 1 495 23.3858 495 51V481H50C22.3858 481 0 458.614 0 431V1Z" stroke="#2291FF"/>
            </svg>
          </SquareIconTop>
          <SmallSquareBottom>
            <svg width="195" height="195" viewBox="0 0 195 195" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H145C172.614 0 195 22.3858 195 50V195H50C22.3858 195 0 172.614 0 145V0Z" fill="#0075E8"/>
            </svg>
          </SmallSquareBottom>
          <SmallSquareTop>
            <svg width="114" height="121" viewBox="0 0 114 121" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H64C91.6142 0 114 22.3858 114 50V121H50C22.3858 121 0 98.6142 0 71V0Z" fill="#1788F8"/>
            </svg>
          </SmallSquareTop>
          <SmallSquareGrid>
            <svg width="131" height="123" viewBox="0 0 131 123" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
                <path d="M129.844 121.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
                <path d="M129.844 81.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
                <path d="M129.844 41.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
                <path d="M129.844 1.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
              </g>
            </svg>
          </SmallSquareGrid>
          <SquareIconBottom>
            <svg width="594" height="523" viewBox="0 0 594 523" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H544C571.614 1 594 23.3858 594 51V529H51C23.3858 529 1 506.614 1 479V1Z" stroke="#2291FF"/>
            </svg>
          </SquareIconBottom>
          <CircleIcon>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="29" stroke="#2291FF"/>
            </svg>
          </CircleIcon>
        </ForgotPasswordContainer>
      </ForgotPasswordWrapper>
    </>
  );
}

export default ResetPassword;
