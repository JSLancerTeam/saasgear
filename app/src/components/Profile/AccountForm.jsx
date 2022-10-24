import React from 'react';
import PropsType from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { COLORS, mobileQuery } from '@/constants/style';
import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import Input from '../Common/Input/Input';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button';

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

  ${mobileQuery} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DeleteLink = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.RED};
  margin-right: 25px;
  cursor: pointer;

  ${mobileQuery} {
    margin-bottom: 10px;
  }
`;

function AccountForm({ onSubmit, register, errors, loading, apiError, openPopupDeleteAccount }) {
  const { t } = useTranslation();

  return (
    <Form onSubmit={onSubmit}>
      <FormGroupWrapper>
        <FormGroup>
          <FormGroupLabel>{t('common.label.your-name')}</FormGroupLabel>
          <Input name="name" ref={register} />
        </FormGroup>
      </FormGroupWrapper>
      <FormGroup>
        <FormGroupLabel>{t('common.label.email')}</FormGroupLabel>
        <Input type="email" name="email" ref={register} disabled />
      </FormGroup>
      <ButtonGroup>
        <DeleteLink onClick={openPopupDeleteAccount}>{t('profile.text.delete')}</DeleteLink>
        <Button type="submit" color="primary" disabled={loading}>{loading ? t('common.text.please-wait') : t('common.text.save-and-update')}</Button>
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
