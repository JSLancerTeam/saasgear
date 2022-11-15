import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import FormControl from '@/components/Common/FormControl';
import { COLORS } from '@/constants/style';
import Input from '@/components/Common/Input/Input';
import Checkbox from '@/components/Common/Input/InputCheckbox';
import Button from '@/components/Common/Button';
import ErrorText from '@/components/Common/ErrorText';
import Logo from '@/components/Common/Logo';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import SocialAuth from '@/containers/Auth/SocialAuth';
import { ReactHookFormType } from "@/typeReactHookForm";

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
    <div className='bg-white max-w-[300px] w-[300px]'>
      <Logo />
      <form onSubmit={onSubmit} className='mb-[24px]'>
        <div className='font-bold text-[26px] leading-9 text-sapphire_blue mb-[34px]'>{t('Sign_in.text.heading')}</div>
        <div>
          <div className='mb-4 w-full block'>
            <FormGroupLabel>{t('Common.label.email')}</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('Common.placeholder.email')}
                name="email"
                ref={register}
              />
              {formErrors?.email?.message && (
                <ErrorText message={String(t(formErrors.email.message))} />
              )}
            </FormControl>
          </div>
          <div className='mb-4 w-full block'>
            <FormGroupLabel>{t('Common.label.password')}</FormGroupLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t('Common.placeholder.password')}
                name="password"
                ref={register}
              />
              {formErrors?.password?.message && (
                <ErrorText message={String(t(formErrors.password.message))} />
              )}
            </FormControl>
          </div>
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
      </form>
      {apiError && <ErrorText message={String(t(`Sign_in.error.${apiError}`))} position="center" />}
      <div className='mt-[179px] text-center text-[14px] leading-[24px] text-sapphire_blue'>
        <Trans components={[<Link to="/auth/signup"></Link>]}>
          {t('Sign_in.text.not_have_account')}
        </Trans>
      </div>
    </div>
  );
};

export default SignInForm;
