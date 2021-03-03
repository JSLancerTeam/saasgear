import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoBack from '@/components/Common/GoBack';
import Logo from '@/components/Common/Logo';
import {
  ForgotPasswordText,
  ForgotPasswordDescription,
  ForgotPasswordFormWrapper,
  ForgotPasswordButton,
  TextNote,
} from '@/components/Auth/AuthForm';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import FormControl from '@/components/Common/FormControl/FormControl';
import ErrorText from '@/components/Common/ErrorText';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button/Button';
import Badge from '@/components/Common/Badge';

function ResetPasswordForm({ onSubmit, register, errors, apiError, isSubmiting }) {
  return (
    <>
      <GoBack link="/auth/signin">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7H1" stroke="#7C88B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13L1 7L7 1" stroke="#7C88B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </GoBack>
      <div>
        <Logo />
      </div>
      <ForgotPasswordText>
        Reset Password
      </ForgotPasswordText>
      <ForgotPasswordDescription>
        Enter your Spotify username, or the email address you used to register. We will send you an email containing your username and a link to reset your password.
      </ForgotPasswordDescription>
      <ForgotPasswordFormWrapper onSubmit={onSubmit}>
        <FormGroup>
          <FormGroupLabel>
            Password
          </FormGroupLabel>
          <FormControl>
            <Input type="password" placeHolder="your password" name="password" ref={register} />
            {errors?.password && (
              <ErrorText message={errors.password.message} />
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>
            Confirm Password
          </FormGroupLabel>
          <FormControl>
            <Input type="password" placeHolder="confirm your password" name="passwordConfirmation" ref={register} />
            {errors?.passwordConfirmation && (
              <ErrorText message={errors.passwordConfirmation.message} />
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ForgotPasswordButton>
            <Button color="primary" type="submit">
              {isSubmiting ? 'Please wait ...' : 'Reset Password'}
            </Button>
          </ForgotPasswordButton>
          {apiError && (
            <Badge type="error">{apiError}</Badge>
          )}
          <TextNote>If you still need help, contact <Link to="##">Saasgear Support</Link></TextNote>
        </FormGroup>
      </ForgotPasswordFormWrapper>
    </>
  );
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  apiError: PropTypes.string,
  isSubmiting: PropTypes.bool
};

export default ResetPasswordForm;
