import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
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
import { ReactHookFormType } from "@/typeReactHookForm";

type Props = ReactHookFormType & {
  isSubmitted: boolean;
  isSubmitting: boolean;
  apiError?: string;
}

const ForgotPasswordForm: React.FC<Props> = ({
  onSubmit,
  register,
  errors,
  isSubmitted,
  isSubmitting,
  apiError,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <GoBack />
      <div>
        <Logo />
      </div>
      <ForgotPasswordText>{t('Common.title.forgot-password')}</ForgotPasswordText>
      <ForgotPasswordDescription>
        {t('Forgot-password.description')}
      </ForgotPasswordDescription>
      {!isSubmitted ? (
        <ForgotPasswordFormWrapper onSubmit={onSubmit}>
          <FormGroup>
            <FormGroupLabel>{t('Common.label.your-email')}</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('Common.placeholder.email')}
                name="email"
                ref={register}
              />
              {errors?.email?.message && <ErrorText message={t(errors.email.message)} />}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ForgotPasswordButton>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('Common.text.please-wait') : t('Common.text.save')}
              </Button>
            </ForgotPasswordButton>
            {apiError && <ErrorText message={t(`Forgot-password.error.${apiError}`)} position="center" />}
            <TextNote>
              <Trans components={[<Link to="##"></Link>]}>
                {t('Forgot-password.footer')}
              </Trans>
            </TextNote>
          </FormGroup>
        </ForgotPasswordFormWrapper>
      ) : (
        <>
          <ConfirmationText>
            {t('Forgot-password.confirm')}
          </ConfirmationText>
          <TextNote>
            <Trans components={[<Link to="/auth/signin"></Link>]}>
              {t('Forgot-password.go-to')}
            </Trans>
          </TextNote>
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
