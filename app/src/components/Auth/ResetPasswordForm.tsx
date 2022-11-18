import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import GoBack from '@/components/Common/GoBack';
import Logo from '@/components/Common/Logo';
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
      <div className="font-bold text-[26px] leading-9 text-sapphire_blue mt-[3px]">
        {t('Common.title.reset_password')}
      </div>
      <p className="text-[14px] leading-6 text-sapphire_blue max-w-[567px] mx-auto mt-6 mb-10">
        {t('Reset_password.description')}
      </p>
      <form onSubmit={onSubmit} className="w-[420px] mx-auto my-0 text-left block">
        <div className="block w-full mb-4">
          <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
            {t('Common.label.password')}
          </label>
          <FormControl>
            <Input
              type="password"
              placeholder={t('Common.placeholder.password')}
              name="password"
              ref={register}
            />
            {errors?.password?.message && (
              <ErrorText message={String(t(errors.password.message))} />
            )}
          </FormControl>
        </div>
        <div className="block w-full mb-4">
          <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
            {t('Common.label.confirm_password')}
          </label>
          <FormControl>
            <Input
              type="password"
              placeholder={t('Common.placeholder.confirm_password')}
              name="passwordConfirmation"
              ref={register}
            />
            {errors?.passwordConfirmation?.message && (
              <ErrorText message={String(t(errors.passwordConfirmation.message))} />
            )}
          </FormControl>
        </div>
        <div className="block w-full mb-4">
          <div className="block text-center mt-[50px]">
            <Button color="primary" type="submit">
              {isSubmitting ? t('Reset_password.please_wait') : t('Common.title.reset_password')}
            </Button>
          </div>
          {apiError && <Badge type="error">{apiError}</Badge>}
          <div className="text-[14px] leading-6 text-sapphire_blue text-center mt-[69px]">
            <Trans components={[<Link to="##"></Link>]}>
              {t('Forgot_password.footer')}
            </Trans>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResetPasswordForm;
