import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <FormGroupLabel>{t('Profile.text.current_password')}</FormGroupLabel>
        <Input type="password" name="currentPassword" ref={register} />
        {formErrors?.currentPassword?.message && (
          <ErrorText message={t(formErrors.currentPassword.message)} />
        )}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('Profile.text.new_password')}</FormGroupLabel>
        <Input type="password" name="newPassword" ref={register} />
        {formErrors?.newPassword?.message && (
          <ErrorText message={t(formErrors.newPassword.message)} />
        )}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('Profile.text.confirm_new_password')}</FormGroupLabel>
        <Input type="password" name="confirmPassword" ref={register} />
        {formErrors?.confirmPassword?.message && (
          <ErrorText message={t(formErrors.confirmPassword.message)} />
        )}
      </FormGroup>
      <ButtonGroup>
        <Button type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? t('Common.text.please_wait') : t('Profile.text.update_password')}
        </Button>
      </ButtonGroup>
      {apiError && <ErrorText message={t(`Profile.error.password.${apiError}`)} />}
    </Form>
  );
};

export default SecurityForm;
