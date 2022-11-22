import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';

import SecurityForm from '@/components/Profile/SecurityForm';
import changePasswordQuery from '@/queries/auth/changePassword';
import { ReactComponent as ArrowDown24Icon } from '@/assets/images/svg/arrow-down-24.svg';
import { ReactComponent as SettingIcon } from '@/assets/images/svg/setting.svg';

const PasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Common.validation.require_current_password'),
  newPassword: yup.string().required('Common.validation.require_new_password').min(6, 'Common.validation.min_password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ""], 'Common.validation.password_match'),
});

type Payload = {
  currentPassword: string;
  newPassword: string;
}

const PasswordSetting: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(PasswordSchema),
  });
  const [changePasswordMutation, { error, loading }] = useMutation(changePasswordQuery);
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(params: Payload) {
    const { data } = await changePasswordMutation({ variables: params });
    if (data?.changePassword) {
      toast.success('Common.status.change_password_success')
    }
  }

  return (
    <div
      className={cn("max-h-[90px] transition-[max-height] duration-300 ease-in-out overflow-hidden", { 
        "max-h-[1000px]": isOpen 
      })}
    >
      <div onClick={() => setIsOpen(!isOpen)} role="presentation" className="flex justify-between items-center cursor-pointer h-[90px]">
        <div className="flex flex-col">
          <p className="text-[16px] leading-[26px] text-sapphire-blue">{t('Profile.text.change_password')}</p>
          <span className="text-[12px] leading-4 text-white-gray">{t('Profile.text.change_password_desc')}</span>
        </div>
        <div className="flex items-center">
          <span className="hidden font-bold text-[14px] leading-[22px] mr-[14px] text-light-primary max-h-[22px] sm:mr-0 sm:text-left sm:block">
            <SettingIcon />
          </span>
          <span className="block font-bold text-[14px] leading-[22px] mr-[14px] text-light-primary max-h-[22px] sm:mr-0 sm:text-left sm:hidden">
            {t('Profile.text.update_password')}
          </span>
          <ArrowDown24Icon
            className={cn("rotate-0 transition-transform	duration-300 ease-only-ease", {
              'rotate-[-180deg]': isOpen
            })} />
        </div>
      </div>
      <SecurityForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        formErrors={formErrors}
        apiError={error?.graphQLErrors?.[0]?.extensions?.code}
        isSubmitting={loading}
      />
    </div>
  )
}

export default PasswordSetting;