import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactHookFormType } from "@/typeReactHookForm";
import Input from '../Common/Input/Input';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button';

type Props = ReactHookFormType & {
  loading?: boolean;
  apiError?: string;
  openPopupDeleteAccount: () => void;
}

const AccountForm: React.FC<Props> = ({ onSubmit, register, loading, apiError, openPopupDeleteAccount }) =>  {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="mx-0 my-6">
      <div className="flex justify-between">
        <div className="block w-full mb-4">
          <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
            {t('Common.label.your_name')}
          </label>
          <Input name="name" ref={register} />
        </div>
      </div>
      <div className="block w-full mb-4">
        <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]">
          {t('Common.label.email')}
        </label>
        <Input type="email" name="email" ref={register} disabled />
      </div>
      <div className="flex justify-between items-center mt-8 sm:flex-col sm:items-start">
        <div onClick={openPopupDeleteAccount} role="presentation" className="text-[14px] leading-6 text-red mr-[25px] cursor-pointer sm:mb-[10px]">
          {t('Profile.text.delete')}
        </div>
        <Button type="submit" color="primary" disabled={loading}>{loading ? t('Common.text.please_wait') : t('Common.text.save_and_update')}</Button>
      </div>
      {apiError && <ErrorText message={apiError} />}
    </form>
  );
};
export default AccountForm;
