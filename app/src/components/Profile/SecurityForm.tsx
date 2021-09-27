import React from 'react';
import styled from 'styled-components';

import { ReactHookFormType } from "@/typeReactHookForm";
import { mobileQuery } from '@/constants/style';
import ErrorText from '../Common/ErrorText';
import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import Input from '../Common/Input/Input';
import Button from '../Common/Button';

const Form = styled.form`
  margin: 24px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 32px;

  ${mobileQuery} {
    justify-content: flex-start;
  }
`;

type Props = ReactHookFormType & {
  apiError?: string;
  isSubmitting: boolean;
}

const SecurityForm: React.FC<Props> = ({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
}) => (
  <Form onSubmit={onSubmit}>
    <FormGroup>
      <FormGroupLabel>Current password</FormGroupLabel>
      <Input type="password" name="currentPassword" ref={register} />
      {formErrors?.currentPassword && (
        <ErrorText message={formErrors.currentPassword.message} />
      )}
    </FormGroup>
    <FormGroup>
      <FormGroupLabel>New password</FormGroupLabel>
      <Input type="password" name="newPassword" ref={register} />
      {formErrors?.newPassword && (
        <ErrorText message={formErrors.newPassword.message} />
      )}
    </FormGroup>
    <FormGroup>
      <FormGroupLabel>Confirm new password</FormGroupLabel>
      <Input type="password" name="confirmPassword" ref={register} />
      {formErrors?.confirmPassword && (
        <ErrorText message={formErrors.confirmPassword.message} />
      )}
    </FormGroup>
    <ButtonGroup>
      <Button type="submit" color="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Please wait' : 'Update Password'}
      </Button>
    </ButtonGroup>
    {apiError && <ErrorText message={apiError} />}
  </Form>
);

export default SecurityForm;
