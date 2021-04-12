import React from 'react';
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';
import Logo from '@/components/Common/Logo';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import FormControl from '@/components/Common/FormControl';
import Input from '@/components/Common/Input/Input';
import ErrorText from '@/components/Common/ErrorText';
import Button from '@/components/Common/Button';
import GoBack from '@/components/Common/GoBack';
import {
  ForgotPasswordText,
  ForgotPasswordDescription,
  ForgotPasswordFormWrapper,
  ForgotPasswordButton,
  TextNote,
  ConfirmationText,
} from '@/components/Auth/AuthForm';

function ForgotPasswordForm({
  onSubmit,
  register,
  errors,
  isSubmitted,
  isSubmitting,
  apiError,
}) {
  return (
    <>
      <GoBack />
      <div>
        <Logo />
      </div>
      <ForgotPasswordText>Forgot Password</ForgotPasswordText>
      <ForgotPasswordDescription>
        Enter your username, or the email address you used to register. We will
        send you an email containing your username and a link to reset your
        password.
      </ForgotPasswordDescription>
      {!isSubmitted ? (
        <ForgotPasswordFormWrapper onSubmit={onSubmit}>
          <FormGroup>
            <FormGroupLabel>Your Email</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="yourname@yourbusiness.com"
                name="email"
                ref={register}
              />
              {errors?.email && <ErrorText message={errors.email.message} />}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ForgotPasswordButton>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Please wait' : 'Send'}
              </Button>
            </ForgotPasswordButton>
            {apiError && <ErrorText message={apiError} position="center" />}
            <TextNote>
              If you still need help, contact{' '}
              <Link to="##">Saasgear Support</Link>
            </TextNote>
          </FormGroup>
        </ForgotPasswordFormWrapper>
      ) : (
        <>
          <ConfirmationText>
            We&apos;ve sent you an email with a link to reset password. Please
            check your email so create new password
          </ConfirmationText>
          <TextNote>
            Go to <Link to="/auth/signin">Sign In</Link>
          </TextNote>
        </>
      )}
    </>
  );
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  isSubmitted: PropsType.bool.isRequired,
  isSubmitting: PropsType.bool.isRequired,
  errors: PropsType.object,
  apiError: PropsType.string,
};

export default ForgotPasswordForm;
