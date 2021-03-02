import React from 'react';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import FormControl from '@/components/Common/FormControl/FormControl';
import Input from '@/components/Common/Input/Input';
import {
  SignUpFormContainer,
  LogoHeader,
  LogoHeaderName,
  FormContent,
  FormHeader,
  FormGroup,
  FormGroupLabel,
  FormNote,
} from '@/components/Auth/AuthForm';
import styled from 'styled-components';
import Button from '../Common/Button/Button';

const FormSubmitButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 34px;
`;

const TextHaveAccount = styled(FormNote)`
  margin-top: 92px;
  text-align: center;
`

function SignUpForm({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
  submitText = 'Submit',
}) {
  return (
    <SignUpFormContainer>
      <LogoHeader>
        <LogoHeaderName>SaaS</LogoHeaderName>
        <span className="logo-header-title">gear</span>
      </LogoHeader>
      <FormContent onSubmit={onSubmit}>
        <FormHeader>Create Account</FormHeader>
        <div>
          <FormGroup>
            <FormGroupLabel>
              Your Name
            </FormGroupLabel>
            <FormControl>
              <Input type="text" placeHolder="David" name="name" ref={register} />
              {formErrors?.name && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formErrors.name.message}
                </p>
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>
              Email
            </FormGroupLabel>
            <FormControl>
              <Input type="email" placeHolder="yourname@yourbusiness.com" name="email" ref={register} />
              {formErrors?.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formErrors.email.message}
                </p>
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>
              Password
            </FormGroupLabel>
            <FormControl>
              <Input type="password" placeHolder="Your password" name="password" ref={register} />
              {formErrors?.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formErrors.password.message}
                </p>
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>
              Confirm password
            </FormGroupLabel>
            <FormControl>
              <Input type="password" placeHolder="Confirm your password" name="passwordConfirmation" ref={register} />
              {formErrors?.passwordConfirmation && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formErrors.passwordConfirmation.message}
                </p>
              )}
            </FormControl>
          </FormGroup>
          <FormSubmitButton color="primary" type="submit">
            {isSubmitting ? 'Please wait' : submitText}
          </FormSubmitButton>
        </div>
      </FormContent>
      {apiError && (
        <p className="text-red-500 text-xs italic mt-4 text-center">{apiError}</p>
      )}
      <FormNote>
        By clicking Sign Up, you agree to our <a href="##">Terms</a>, <a href="##">Data Policy</a> and <a href="##">Cookie Policy</a>.
      </FormNote>
      <TextHaveAccount>Already have account? <Link to="/auth/signin">Sign In</Link>.</TextHaveAccount>
    </SignUpFormContainer>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  apiError: PropsType.string,
  isSubmitting: PropsType.bool.isRequired,
  submitText: PropsType.string,
};

export default SignUpForm;
