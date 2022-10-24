import React from 'react';
import PropsType from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

function SecurityForm({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
}) {
  const { t } = useTranslation();

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <FormGroupLabel>{t('profile.text.current-password')}</FormGroupLabel>
        <Input type="password" name="currentPassword" ref={register} />
        {formErrors?.currentPassword && (
          <ErrorText message={formErrors.currentPassword.message} />
        )}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('profile.text.new-password')}</FormGroupLabel>
        <Input type="password" name="newPassword" ref={register} />
        {formErrors?.newPassword && (
          <ErrorText message={formErrors.newPassword.message} />
        )}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('profile.text.confirm-new-password')}</FormGroupLabel>
        <Input type="password" name="confirmPassword" ref={register} />
        {formErrors?.confirmPassword && (
          <ErrorText message={formErrors.confirmPassword.message} />
        )}
      </FormGroup>
      <ButtonGroup>
        <Button type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? t('common.text.please-wait') : t('profile.text.update-password')}
        </Button>
      </ButtonGroup>
      {apiError && <ErrorText message={apiError} />}
    </Form>
  );
}

SecurityForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  apiError: PropsType.string,
  isSubmitting: PropsType.bool.isRequired,
};

export default SecurityForm;
