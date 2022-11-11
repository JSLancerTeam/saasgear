import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GoBack from '@/components/Common/GoBack';
import Logo from '@/components/Common/Logo';
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
import { ReactHookFormType } from "@/typeReactHookForm";

type Props = ReactHookFormType & {
  isSubmitting?: boolean;
  apiError?: string;
}

const ResetPasswordForm:React.FC<Props> = ({
  onSubmit,
  register,
  errors,
  apiError,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <GoBack link="/auth/signin" />
      <div>
        <Logo />
      </div>
      <ForgotPasswordText>{t('Common.title.reset-password')}</ForgotPasswordText>
      <ForgotPasswordDescription>
        {t('Reset-password.description')}
      </ForgotPasswordDescription>
      <ForgotPasswordFormWrapper onSubmit={onSubmit}>
        <FormGroup>
          <FormGroupLabel>{t('Common.label.password')}</FormGroupLabel>
          <FormControl>
            <Input
              type="password"
              placeholder={t('Common.placeholder.password')}
              name="password"
              ref={register}
            />
            {errors?.password?.message && (
              <ErrorText message={t(errors.password.message)} />
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
            {errors?.passwordConfirmation?.message && (
              <ErrorText message={t(errors.passwordConfirmation.message)} />
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ForgotPasswordButton>
            <Button color="primary" type="submit">
              {isSubmitting ? t('Reset-password.please-wait') : t('Common.title.reset-password')}
            </Button>
          </ForgotPasswordButton>
          {apiError && <Badge type="error">{apiError}</Badge>}
          <TextNote>
            {t('Forgot-password.footer')}{' '}
            <Link to="##">{t('Forgot-password.support')}</Link>
          </TextNote>
        </FormGroup>
      </ForgotPasswordFormWrapper>
    </>
  );
}

export default ResetPasswordForm;
