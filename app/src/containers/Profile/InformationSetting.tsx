import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import type { Profile } from '@/features/auth/user';
import { setProfileUser } from '@/features/auth/user';
import { resolveAvatarPath } from '@/helpers/avatar.helper';
import updateProfileQuery from '@/queries/user/updateProfile';
import updateProfileAvatarQuery from '@/queries/user/updateUserAvatar';
import AccountForm from '@/components/Profile/AccountForm';
import AvatarIcon from '@/assets/images/avatar.jpg';
import { ReactComponent as SettingIcon } from '@/assets/images/svg/setting.svg';
import { ReactComponent as ArrowDown24Icon } from '@/assets/images/svg/arrow-down-24.svg';
import DeleteAccount from './DeleteAccount';

const AccountSchema = yup.object().shape({
  name: yup.string().required('Common.validation.require_name'),
});

type Payload = {
  name: string;
  company: string;
  position: string;
}

type Props = {
  user: Profile;
};

const InformationSetting: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { register, handleSubmit, errors, setValue, getValues, watch } = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues: user,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDeleteAccount, setIsOpenModalDeleteAccount] = useState(
    false,
  );

  const [updateProfileMutation, { error, loading }] = useMutation(
    updateProfileQuery,
  );
  const [
    updateProfileAvatarMutation,
    { error: updateAvatarError, loading: isUpdatingAvatar },
  ] = useMutation(updateProfileAvatarQuery);


  async function onSubmit(dataForm: Payload) {
    const { name, company, position } = dataForm;
    const params = {
      name,
      company,
      position,
    };

    try {
      const { data } = await updateProfileMutation({ variables: params });
      if (data?.updateProfile) {
        toast.success(t('Common.status.update_success'));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function changeProfile(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file: File = (e?.target?.files as FileList)[0];
      if (file) {
        if (file.size > 2 * 1000 * 1000) {
          toast.error(t('Common.status.error_big_size'));
          return;
        }
        const { data } = await updateProfileAvatarMutation({
          variables: {
            file,
          },
        });
        if (data && data.updateProfileAvatar && data.updateProfileAvatar.url) {
          dispatch(setProfileUser({ data: {avatarUrl: data.updateProfileAvatar.url}, loading: isUpdatingAvatar }));
          setValue('avatarUrl', data.updateProfileAvatar.url);
          toast.success(t('Common.status.channge_avatar_success'));
        }
      }
    } catch (errorChangeProfile) {
      toast.error(t('Common.status.change_avatar_failed'));
    }
  }

  useEffect(() => {
    register('avatarUrl');
    watch('avatarUrl');
  }, []);

  useEffect(() => {
    setValue('avatarUrl', user.avatarUrl);
  }, [user.avatarUrl]);

  return (
    <div
      className={cn("border-b border-solid border-dark-grey shadow-xxl max-h-[90px] transition[-max-h] duration-300 ease-in-out overflow-hidden", {
        'max-h-[1000px]': isOpen
      })}>
      <div onClick={() => setIsOpen(!isOpen)} role="presentation" className="flex justify-between items-center cursor-pointer h-[90px]">
        <div className="flex items-center">
          <label htmlFor="avatar" className="w-[62px] h-[62px] flex justify-center items-center sm:w-[35px] sm:h-[35px] [&_img]:rounded-[100%] [&_img]:w-[62px] [&_img]:h-[62px] [&_img]:object-cover [&_img]:sm:w-[35px] [&_img]:sm:h-[35px]">
            <img src={resolveAvatarPath(getValues('avatarUrl'), AvatarIcon)} alt="avatar" />
            <input
              type="file"
              id="avatar"
              hidden
              onChange={changeProfile}
              accept="image/*"
            />
          </label>
          <div className="flex flex-col ml-4 sm:ml-[5px]">
            <span className="text-[16px] leading-[26px] text-sapphire-blue mb-[2px]">{user.name}</span>
            <span className="text-[12px] leading-4 text-white-gray opacity-90">{user.email}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="hidden font-bold text-[14px] leading-[22px] mr-[14px] text-light-primary max-h-[22px] sm:mr-0 sm:block"><SettingIcon /></span>
          <span className="block font-bold text-[14px] leading-[22px] mr-[14px] text-light-primary max-h-[22px] sm:mr-0 sm:hidden">{t('Common.label.edit_profile')}</span>
          <ArrowDown24Icon
            className={cn("rotate-0 transition-transform duration-300 ease-only-ease", {
              "rotate-[-180]": isOpen
            })} />
        </div>
      </div>{t('Common.text.avatar')}
      <AccountForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        loading={loading || isUpdatingAvatar}
        errors={errors}
        apiError={error?.message || updateAvatarError?.message}
        openPopupDeleteAccount={() => setIsOpenModalDeleteAccount(true)}
      />
      <DeleteAccount
        isOpen={isOpenModalDeleteAccount}
        closeModal={() => setIsOpenModalDeleteAccount(false)}
      />
    </div>
  );
};

export default InformationSetting;
