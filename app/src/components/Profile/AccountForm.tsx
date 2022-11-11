import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactHookFormType } from "@/typeReactHookForm";
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

type Props = ReactHookFormType & {
  loading?: boolean;
  apiError?: string;
  openPopupDeleteAccount: () => void;
}

const AccountForm: React.FC<Props> = ({ onSubmit, register, loading, apiError, openPopupDeleteAccount }) =>  {
  const { t } = useTranslation();

  return (
    <Form onSubmit={onSubmit}>
      <FormGroupWrapper>
        <FormGroup>
          <FormGroupLabel>{t('Common.label.your-name')}</FormGroupLabel>
          <Input name="name" ref={register} />
        </FormGroup>
      </FormGroupWrapper>
      <FormGroup>
        <FormGroupLabel>{t('Common.label.email')}</FormGroupLabel>
        <Input type="email" name="email" ref={register} disabled />
      </FormGroup>
      <ButtonGroup>
        <DeleteLink onClick={openPopupDeleteAccount}>{t('Profile.text.delete')}</DeleteLink>
        <Button type="submit" color="primary" disabled={loading}>{loading ? t('Common.text.please-wait') : t('Common.text.save-and-update')}</Button>
      </ButtonGroup>
      {apiError && <ErrorText message={apiError} />}
    </Form>
  );
};
export default AccountForm;
