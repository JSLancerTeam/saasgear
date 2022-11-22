import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import Logo from '@/components/Common/Logo';
import FormControl from '@/components/Common/FormControl';
import Input from '@/components/Common/Input/Input';
import ErrorText from '@/components/Common/ErrorText';
import Button from '@/components/Common/Button';
import GoBack from '@/components/Common/GoBack';
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
      <div className="font-bold text-[26px] leading-9 text-sapphire-blue mt-[3px]">
        {t('Common.title.forgot_password')}
      </div>
      <p className="text-[14px] leading-6 text-sapphire-blue max-w-[567px] mx-auto mt-6 mb-10">
        {t('Forgot_password.description')}
      </p>
      {!isSubmitted ? (
        <form onSubmit={onSubmit} className="w-[420px] mx-auto my-0 text-left block">
          <div className="mb-4 w-full block">
            <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white-blue mix-blend-normal opacity-90 block mb-[19px] uppercase">
              {t('Common.label.your_email')}
            </label>
            <FormControl>
              <Input
                type="email"
                placeholder={t('Common.placeholder.email')}
                name="email"
                ref={register}
              />
              {errors?.email?.message && <ErrorText message={String(t(errors.email.message))} />}
            </FormControl>
          </div>
          <div className="mb-4 w-full block">
            <div className="mt-[50px] block text-center">
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('Common.text.please_wait') : t('Common.text.save')}
              </Button>
            </div>
            {apiError && <ErrorText message={String(t(`Forgot_password.error.${apiError}`))} position="center" />}
            <div className="text-[14px] leading-6 text-sapphire-blue text-center mt-[69px]">
              <Trans components={[<Link to="##"></Link>]}>
                {t('Forgot_password.footer')}
              </Trans>
            </div>
          </div>
        </form>
      ) : (
        <>
          <p className="text-[16px] leading-6 max-w-[567px] mx-auto mt-[24px] mb-[40px] bg-green text-white px-[15px] py-[14px] rounded-[3px]">
            {t('Forgot_password.confirm')}
          </p>
          <div className="text-[14px] leading-6 text-sapphire-blue text-center mt-[69px]">
            <Trans components={[<Link to="/auth/signin"></Link>]}>
              {t('Forgot_password.go_to')}
            </Trans>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
