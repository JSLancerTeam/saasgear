import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoBack from '@/components/Common/GoBack';
import Logo from '@/components/Common/Logo';
import { useTranslation } from 'react-i18next';
import {
  ForgotPasswordText,
  ForgotPasswordDescription,
  ForgotPasswordFormWrapper,
  ForgotPasswordButton,
  TextNote,
} from '@/components/Auth/AuthForm';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import FormControl from '@/components/Common/FormControl';
import ErrorText from '@/components/Common/ErrorText';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button';
import Badge from '@/components/Common/Badge';

function ResetPasswordForm({
  onSubmit,
  register,
  errors,
  apiError,
  isSubmiting,
}) {
  const { t } = useTranslation();

  return (
    <>
      <GoBack link="/auth/signin" />
      <div>
        <Logo />
      </div>
      <ForgotPasswordText>{t('common.title.reset-password')}</ForgotPasswordText>
      <ForgotPasswordDescription>
        {t('reset-password.description')}
      </ForgotPasswordDescription>
      <ForgotPasswordFormWrapper onSubmit={onSubmit}>
        <FormGroup>
          <FormGroupLabel>{t('common.label.password')}</FormGroupLabel>
          <FormControl>
            <Input
              type="password"
              placeholder={t('common.placeholder.password')}
              name="password"
              ref={register}
            />
            {errors?.password && (
              <ErrorText message={t(errors.password.message)} />
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>{t('common.label.confirm-password')}</FormGroupLabel>
          <FormControl>
            <Input
              type="password"
              placeholder={t('common.placeholder.confirm-password')}
              name="passwordConfirmation"
              ref={register}
            />
            {errors?.passwordConfirmation && (
              <ErrorText message={t(errors.passwordConfirmation.message)} />
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ForgotPasswordButton>
            <Button color="primary" type="submit">
              {isSubmiting ? t('reset-password.please-wait') : t('common.title.reset-password')}
            </Button>
          </ForgotPasswordButton>
          {apiError && <Badge type="error">{apiError}</Badge>}
          <TextNote>
            {t('reset-password.footer')}{' '}
            <Link to="##">{t('reset-password.support')}</Link>
          </TextNote>
        </FormGroup>
      </ForgotPasswordFormWrapper>
    </>
  );
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  apiError: PropTypes.string,
  isSubmiting: PropTypes.bool,
};

export default ResetPasswordForm;
