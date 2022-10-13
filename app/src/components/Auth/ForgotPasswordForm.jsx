import React from 'react';
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Common/Logo';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import FormControl from '@/components/Common/FormControl';
import Input from '@/components/Common/Input/Input';
import ErrorText from '@/components/Common/ErrorText';
import Button from '@/components/Common/Button';
import GoBack from '@/components/Common/GoBack';
import {
  ForgotPasswordText,
  ForgotPasswordDescription,
  ForgotPasswordFormWrapper,
  ForgotPasswordButton,
  TextNote,
  ConfirmationText,
} from '@/components/Auth/AuthForm';

function ForgotPasswordForm({
  onSubmit,
  register,
  errors,
  isSubmitted,
  isSubmitting,
  apiError,
}) {
  const { t } = useTranslation();
  return (
    <>
      <GoBack />
      <div>
        <Logo />
      </div>
      <ForgotPasswordText>{t('common.title.forgot-password')}</ForgotPasswordText>
      <ForgotPasswordDescription>
        {t('forgot-password.description')}
      </ForgotPasswordDescription>
      {!isSubmitted ? (
        <ForgotPasswordFormWrapper onSubmit={onSubmit}>
          <FormGroup>
            <FormGroupLabel>{t('common.label.your-email')}</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('common.placeholder.email')}
                name="email"
                ref={register}
              />
              {errors?.email && <ErrorText message={t(errors.email.message)} />}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ForgotPasswordButton>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('common.text.please-wait') : t('common.text.send')}
              </Button>
            </ForgotPasswordButton>
            {apiError && <ErrorText message={apiError} position="center" />}
            <TextNote>
              {t('forgot-password.footer')}{' '}
              <Link to="##">{t('forgot-password.support')}</Link>
            </TextNote>
          </FormGroup>
        </ForgotPasswordFormWrapper>
      ) : (
        <>
          <ConfirmationText>
            {t('forgot-password.confirm')}
          </ConfirmationText>
          <TextNote>
            {t('forgot-password.go-to')} <Link to="/auth/signin">{t('common.title.sign-in')}</Link>
          </TextNote>
        </>
      )}
    </>
  );
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  isSubmitted: PropsType.bool.isRequired,
  isSubmitting: PropsType.bool.isRequired,
  errors: PropsType.object,
  apiError: PropsType.string,
};

export default ForgotPasswordForm;
