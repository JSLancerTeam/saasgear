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
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

const DeleteLink = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.RED};
  margin-right: 25px;
  cursor: pointer;
`;

function AccountForm({ onSubmit, register, errors, loading, apiError, openPopupDeleteAccount }) {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroupWrapper>
        <FormGroup>
          <FormGroupLabel>Your name</FormGroupLabel>
          <Input name="name" ref={register} />
        </FormGroup>
      </FormGroupWrapper>
      <FormGroup>
        <FormGroupLabel>Email</FormGroupLabel>
        <Input type="email" name="email" ref={register} disabled />
      </FormGroup>
      <ButtonGroup>
        <DeleteLink onClick={openPopupDeleteAccount}>I&apos;d like to delete my account</DeleteLink>
        <Button type="submit" color="primary" disabled={loading}>{loading ? 'Please wait' : 'Save and Update'}</Button>
      </ButtonGroup>
      {apiError && <ErrorText message={apiError} />}
    </Form>
  );
}

AccountForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  errors: PropsType.object,
  loading: PropsType.bool,
  apiError: PropsType.string,
  openPopupDeleteAccount: PropsType.func,
};

export default AccountForm;
