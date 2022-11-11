import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import {
  SignUpFormContainer,
  FormContent,
  FormHeader,
  FormNote,
} from '@/components/Auth/AuthForm';
import FormControl from '@/components/Common/FormControl';
import { COLORS } from '@/constants/style';
import Input from '@/components/Common/Input/Input';
import Checkbox from '@/components/Common/Input/InputCheckbox';
import Button from '@/components/Common/Button';
import ErrorText from '@/components/Common/ErrorText';
import Logo from '@/components/Common/Logo';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import SocialAuth from '@/containers/Auth/SocialAuth';
import { ReactHookFormType } from "@/typeReactHookForm";


const SignInContainer = styled(SignUpFormContainer)`
  width: 300px;
`;
const RembemberSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
`;
const RememberLabel = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-left: 5px;
`;
const SubmitButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 32px;
`;
const ForgotLink = styled.div`
  & > a {
    font-size: 14px;
    line-height: 24px;
    color: ${COLORS.LIGHT_PRIMARY};
    text-align: right;
    display: block;
    margin-top: 24px;
  }
`;
const TextHaveAccount = styled(FormNote)`
  margin-top: 179px;
  text-align: center;
`;

type Props = ReactHookFormType & {
  isSubmitting: boolean;
  apiError?: string;
}

const SignInForm: React.FC<Props> = ({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <SignInContainer>
      <Logo />
      <FormContent onSubmit={onSubmit}>
        <FormHeader>{t('Sign_in.text.heading')}</FormHeader>
        <div>
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
          <RembemberSection>
            <Checkbox type="checkbox" name="rembemer" id="rembemer" />
            <RememberLabel htmlFor="rembemer">{t('Common.label.remember_label')}</RememberLabel>
          </RembemberSection>
          <SubmitButton color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('Common.text.please_wait') : t('Sign_in.text.button_text')}
          </SubmitButton>
          <ForgotLink>
            <Link to="/auth/forgot-password">{t('Sign_in.text.forgot_password')}</Link>
          </ForgotLink>
          <SocialAuth />
        </div>
      </FormContent>
      {apiError && <ErrorText message={t(`Sign_in.error.${apiError}`)} position="center" />}
      <TextHaveAccount>
        <Trans components={[<Link to="/auth/signup"></Link>]}>
          {t('Sign_in.text.not_have_account')}
        </Trans>
      </TextHaveAccount>
    </SignInContainer>
  );
};

export default SignInForm;
