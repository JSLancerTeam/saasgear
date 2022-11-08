import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormControl from '@/components/Common/FormControl';
import Input from '@/components/Common/Input/Input';
import {
  SignUpFormContainer,
  FormContent,
  FormHeader,
  FormNote,
} from '@/components/Auth/AuthForm';
import styled from 'styled-components';
import ErrorText from '@/components/Common/ErrorText';
import Button from '@/components/Common/Button';
import Logo from '@/components/Common/Logo';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import { ReactHookFormType } from "@/typeReactHookForm";

const FormSubmitButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 34px;
`;

const TextHaveAccount = styled(FormNote)`
  margin-top: 92px;
  text-align: center;
`;

type CustomProps = ReactHookFormType & {
  isSubmitting: boolean;
  apiError?: string;
  submitText?: string;
}

const SignUpForm: React.FC<CustomProps> = ({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
  submitText = 'Submit',
}) => {
  const { t } = useTranslation();
  return (
    <SignUpFormContainer>
      <Logo />
      <FormContent onSubmit={onSubmit}>
        <FormHeader>{t('sign-up.text.heading')}</FormHeader>
        <div>
          <FormGroup>
            <FormGroupLabel>{t('common.label.your-name')}</FormGroupLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t('common.placeholder.name')}
                name="name"
                ref={register}
              />
              {formErrors?.name && (
                <ErrorText message={t(`${formErrors.name.message}`)} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>{t('common.label.email')}</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('common.placeholder.email')}
                name="email"
                ref={register}
              />
              {formErrors?.email && (
                <ErrorText message={t(`${formErrors.email.message}`)} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>{t('common.label.password')}</FormGroupLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t('common.placeholder.password')}
                name="password"
                ref={register}
              />
              {formErrors?.password && (
                <ErrorText message={t(`${formErrors.password.message}`)} />
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
              {formErrors?.passwordConfirmation && (
                <ErrorText message={t(`${formErrors.passwordConfirmation.message}`)} />
              )}
            </FormControl>
          </FormGroup>
          <FormSubmitButton color="primary" type="submit">
            {isSubmitting ? t('common.text.please-wait') : (submitText ?? t('common.text.submit'))}
          </FormSubmitButton>
        </div>
      </FormContent>
      {apiError && <ErrorText message={apiError} position="center" />}
      <FormNote>
        {t('sign-up.text.footer-desc')} <a href="##">{t('sign-up.text.terms')}</a>,{' '}
        <a href="##">{t('sign-up.text.data-policy')}</a> {t('sign-up.text.and')} <a href="##">{t('sign-up.text.cookie-policy')}</a>.
      </FormNote>
      <TextHaveAccount>
        {t('sign-up.text.have-account')} <Link to="/auth/signin">{t('common.title.sign-in')}</Link>.
      </TextHaveAccount>
    </SignUpFormContainer>
  );
};
export default SignUpForm;
