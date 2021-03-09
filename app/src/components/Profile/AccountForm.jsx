import React from 'react';
import PropsType from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '@/constants/style';
import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import Input from '../Common/Input/Input';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button/Button';

const Form = styled.form`
  margin: 24px 0;
`;

const FormGroupWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${FormGroup} {
    &:first-child {
      margin-right: 25px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 32px;
`;

const DeleteLink = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.LIGHT_PRIMARY};
  margin-right: 25px;
  cursor: pointer;
`;

function AccountForm({ onSubmit, register, errors, openPopupDeleteAccount }) {

  return (
    <Form onSubmit={onSubmit}>
      <FormGroupWrapper>
        <FormGroup>
          <FormGroupLabel>First Name</FormGroupLabel>
          <Input name="firstName" ref={register} />
          {errors?.firstName && (
            <ErrorText message={errors.firstName.message} />
          )}
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>Last Name</FormGroupLabel>
          <Input name="lastName" ref={register} />
          {errors?.lastName && (
            <ErrorText message={errors.lastName.message} />
          )}
        </FormGroup>
      </FormGroupWrapper>
      <FormGroup>
        <FormGroupLabel>Email</FormGroupLabel>
        <Input type="email" name="email" ref={register} />
        {errors?.email && (
          <ErrorText message={errors.email.message} />
        )}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>Company</FormGroupLabel>
        <Input name="company" ref={register} />
        {errors?.company && (
          <ErrorText message={errors.company.message} />
        )}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>Position</FormGroupLabel>
        <Input name="position" ref={register} />
        {errors?.position && (
          <ErrorText message={errors.position.message} />
        )}
      </FormGroup>
      <ButtonGroup>
        <DeleteLink onClick={openPopupDeleteAccount}>I &apos;d like to delete my account</DeleteLink>
        <Button type="submit" color="primary">Save and Update</Button>
      </ButtonGroup>
    </Form>
  );
}

AccountForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  errors: PropsType.object,
  openPopupDeleteAccount: PropsType.func,
};

export default AccountForm;
