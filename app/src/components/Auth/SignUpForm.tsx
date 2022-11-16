import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import FormControl from '@/components/Common/FormControl';
import Input from '@/components/Common/Input/Input';
import styled from 'styled-components';
import ErrorText from '@/components/Common/ErrorText';
import Button from '@/components/Common/Button';
import Logo from '@/components/Common/Logo';
import { ReactHookFormType } from "@/typeReactHookForm";

const FormSubmitButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 34px;
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
    <div className='bg-white max-w-[300px]'>
      <Logo />
      <form onSubmit={onSubmit} className='mb-6'>
        <div className='font-bold text-[26px] leading-9 text-sapphire_blue mb-[34px]'>
          {t('Sign_up.text.heading')}
        </div>
        <div>
          <div className='mb-4 w-full block'>
            <label className='font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block mb-[19px] uppercase'>
              {t('Common.label.your_name')}
            </label>
            <FormControl>
              <Input
                type="text"
                placeholder={t('Common.placeholder.name')}
                name="name"
                ref={register}
              />
              {formErrors?.name?.message && (
                <ErrorText message={String(t(formErrors.name.message))} />
              )}
            </FormControl>
          </div>
          <div className='mb-4 w-full block'>
            <label className='font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block mb-[19px] uppercase'>{t('Common.label.email')}</label>
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
            <label className='font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block mb-[19px] uppercase'>{t('Common.label.password')}</label>
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
          <div className='mb-4 w-full block'>
            <label className='font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block mb-[19px] uppercase'>{t('Common.label.confirm_password')}</label>
            <FormControl>
              <Input
                type="password"
                placeholder={t('Common.placeholder.confirm_password')}
                name="passwordConfirmation"
                ref={register}
              />
              {formErrors?.passwordConfirmation?.message && (
                <ErrorText message={String(t(formErrors.passwordConfirmation.message))} />
              )}
            </FormControl>
          </div>
          <FormSubmitButton color="primary" type="submit">
            {isSubmitting ? t('Common.text.please_wait') : (submitText ?? t('Common.text.submit'))}
          </FormSubmitButton>
        </div>
      </form>
      {apiError && <ErrorText message={String(t(`Sign_up.error.${apiError}`))} position="center" />}
      <div className='text-[14px] leading-6 text-sapphire_blue'>
        <Trans components={[<Link to="##"></Link>, <Link to="##"></Link>, <Link to="##"></Link>]}>
          {t('Sign_up.text.footer_desc')}
        </Trans>
      </div>
      <div className='text-[14px] leading-6 text-sapphire_blue mt-[92px] text-center'>
        <Trans components={[<Link to="/auth/signin"></Link>]}>
          {t('Sign_up.text.have_account')}
        </Trans>
      </div>
    </div>
  );
};
export default SignUpForm;
