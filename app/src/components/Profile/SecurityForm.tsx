import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactHookFormType } from "@/typeReactHookForm";
import ErrorText from '../Common/ErrorText';
import Input from '../Common/Input/Input';
import Button from '../Common/Button';

type Props = ReactHookFormType & {
  apiError?: string;
  isSubmitting: boolean;
}

const SecurityForm: React.FC<Props> = ({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="mx-0 my-6">
      <div className="block w-full mb-4">
        <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
          {t('Profile.text.current_password')}
        </label>
        <Input type="password" name="currentPassword" ref={register} />
        {formErrors?.currentPassword?.message && (
          <ErrorText message={String(t(formErrors.currentPassword.message))} />
        )}
      </div>
      <div className="block w-full mb-4">
        <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
          {t('Profile.text.new_password')}
        </label>
        <Input type="password" name="newPassword" ref={register} />
        {formErrors?.newPassword?.message && (
          <ErrorText message={String(t(formErrors.newPassword.message))} />
        )}
      </div>
      <div className="block w-full mb-4">
        <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
          {t('Profile.text.confirm_new_password')}
        </label>
        <Input type="password" name="confirmPassword" ref={register} />
        {formErrors?.confirmPassword?.message && (
          <ErrorText message={String(t(formErrors.confirmPassword.message))} />
        )}
      </div>
      <div className='flex justify-end items-center mt-8 sm:justify-start'>
        <Button type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? t('Common.text.please_wait') : t('Profile.text.update_password')}
        </Button>
      </div>
      {apiError && <ErrorText message={String(t(`Profile.error.password.${apiError}`))} />}
    </form>
  );
};

export default SecurityForm;
