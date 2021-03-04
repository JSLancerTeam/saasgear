import React from 'react';
import styled from 'styled-components';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import {
  SignUpFormContainer,
  FormContent,
  FormHeader,
  FormNote
} from '@/components/Auth/AuthForm';
import FormControl from '@/components/Common/FormControl/FormControl';
import { COLORS } from '@/constants/style';
import Input from '@/components/Common/Input/Input';
import Checkbox from '@/components/Common/Input/InputCheckbox';
import Button from '@/components/Common/Button/Button';
import ErrorText from '@/components/Common/ErrorText';
import Logo from '@/components/Common/Logo';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';

const SignInContainer = styled(SignUpFormContainer)`
  width: 300px;
`
const RembemberSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
`
const RememberLabel = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-left: 5px;
`
const SubmitButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 32px;
`
const ForgotLink = styled.div`
  & > a {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: ${COLORS.LIGHT_PRIMARY};
    text-align: right;
    display: block;
    margin-top: 24px;
  }
`
const TextHaveAccount = styled(FormNote)`
  margin-top: 179px;
  text-align: center;
`

function SignInForm({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
}) {
  return (
    <SignInContainer>
      <Logo />
      <FormContent onSubmit={onSubmit}>
        <FormHeader>Welcome Back!</FormHeader>
        <div>
          <FormGroup>
            <FormGroupLabel>
              Email
            </FormGroupLabel>
            <FormControl>
              <Input type="email" placeHolder="yourname@yourbusiness.com" name="email" ref={register} />
              {formErrors?.email && (
                <ErrorText message={formErrors.email.message} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>
              Password
            </FormGroupLabel>
            <FormControl>
              <Input type="password" placeHolder="your password" name="password" ref={register} />
              {formErrors?.password && (
                <ErrorText message={formErrors.password.message} />
              )}
            </FormControl>
          </FormGroup>
          <RembemberSection>
            <Checkbox type="checkbox" name="rembemer" id="rembemer" />
            <RememberLabel htmlFor="rembemer">Remember me</RememberLabel>
          </RembemberSection>
          <SubmitButton color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait' : 'Sign in'}
          </SubmitButton>
          <ForgotLink>
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </ForgotLink>
        </div>
      </FormContent>
      {apiError && (
        <ErrorText message={apiError} position="center" />
      )}
      <TextHaveAccount>Dont have account? <Link to="/auth/signup">Register</Link>.</TextHaveAccount>
    </SignInContainer>
  );
}

SignInForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  apiError: PropsType.string,
  isSubmitting: PropsType.bool.isRequired,
};

export default SignInForm;
