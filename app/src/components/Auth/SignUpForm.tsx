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
        <FormHeader>{t('Sign-up.text.heading')}</FormHeader>
        <div>
          <FormGroup>
            <FormGroupLabel>{t('Common.label.your-name')}</FormGroupLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={t('Common.placeholder.name')}
                name="name"
                ref={register}
              />
              {formErrors?.name?.message && (
                <ErrorText message={t(formErrors.name.message)} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>{t('Common.label.email')}</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('Common.placeholder.email')}
                name="email"
                ref={register}
              />
              {formErrors?.email?.message && (
                <ErrorText message={t(formErrors.email.message)} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>{t('Common.label.password')}</FormGroupLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t('Common.placeholder.password')}
                name="password"
                ref={register}
              />
              {formErrors?.password?.message && (
                <ErrorText message={t(formErrors.password.message)} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>{t('Common.label.confirm-password')}</FormGroupLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t('Common.placeholder.confirm-password')}
                name="passwordConfirmation"
                ref={register}
              />
              {formErrors?.passwordConfirmation?.message && (
                <ErrorText message={t(formErrors.passwordConfirmation.message)} />
              )}
            </FormControl>
          </FormGroup>
          <FormSubmitButton color="primary" type="submit">
            {isSubmitting ? t('Common.text.please-wait') : (submitText ?? t('Common.text.submit'))}
          </FormSubmitButton>
        </div>
      </FormContent>
      {apiError && <ErrorText message={apiError} position="center" />}
      <FormNote>
        {t('Sign-up.text.footer-desc')} <a href="##">{t('Sign-up.text.terms')}</a>,{' '}
        <a href="##">{t('Sign-up.text.data-policy')}</a> {t('Sign-up.text.and')} <a href="##">{t('Sign-up.text.cookie-policy')}</a>.
      </FormNote>
      <TextHaveAccount>
        {t('Sign-up.text.have-account')} <Link to="/auth/signin">{t('Common.title.sign-in')}</Link>.
      </TextHaveAccount>
    </SignUpFormContainer>
  );
};
export default SignUpForm;
