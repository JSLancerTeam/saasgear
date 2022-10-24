import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { setProfileUser } from '@/features/auth/user';
import { resolveAvatarPath } from '@/helpers/avatar.helper';
import updateProfileQuery from '@/queries/user/updateProfile';
import updateProfileAvatarQuery from '@/queries/user/updateUserAvatar';
import AccountForm from '@/components/Profile/AccountForm';
import AvatarIcon from '@/assets/images/avatar.jpg';
import { ReactComponent as SettingIcon } from '@/assets/images/svg/setting.svg';
import { COLORS, mobileQuery } from '@/constants/style';
import { ReactComponent as ArrowDown24Icon } from '@/assets/images/svg/arrow-down-24.svg';
import DeleteAccount from './DeleteAccount';

const Wrapper = styled.div`
  border-bottom: 1px solid #eaedf7;
  box-shadow: 0px 2px 4px rgba(28, 41, 90, 0.0367952);
  max-height: 90px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;

  ${(props) =>
    props.expand &&
    css`
      max-height: 1000px;
    `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 90px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.label`
  width: 62px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobileQuery} {
    width: 35px;
    height: 35px;
  }

  img {
    border-radius: 100%;
    width: 100%;
    width: 62px;
    height: 62px;
    object-fit: cover;

    ${mobileQuery} {
      width: 35px;
      height: 35px;
    }
  }
`;

const Info = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;

  ${mobileQuery} {
    margin-left: 5px;
  }
`;

const Name = styled.span`
  font-size: 16px;
  line-height: 26px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-bottom: 2px;
`;

const Email = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${COLORS.WHITE_GRAY};
  opacity: 0.9;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ActionItem = styled.span`
  display: ${(props) => props.mobile ? 'none' : 'block'};
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  margin-right: 14px;
  color: ${COLORS.LIGHT_PRIMARY};
  max-height: 22px;


  ${mobileQuery} {
    margin-right: 0;
    display: ${(props) => props.mobile ? 'block' : 'none'};
  }
`;

const ArrowDown24IconStyle = styled(ArrowDown24Icon)`
  transform: rotate(0);
  transition: transform 0.3s ease;

  ${(props) =>
    props.expand &&
    css`
      transform: rotate(-180deg);
    `}
`;

const AccountSchema = yup.object().shape({
  name: yup.string().required('common.validation.require-name'),
});

const InformationSetting = ({ user }) => {
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


  async function onSubmit(dataForm) {
    const { name, company, position } = dataForm;
    const params = {
      name,
      company,
      position,
    };

    try {
      const { data } = await updateProfileMutation({ variables: params });
      if (data?.updateProfile) {
        toast.success(t('common.status.update-success'));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function changeProfile(e) {
    try {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1000 * 1000) {
          toast.error(t('common.status.error-big-size'));
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
          toast.success(t('common.status.channge-avatar-success'));
        }
      }
    } catch (errorChangeProfile) {
      toast.error(t('common.status.change-avatar-failed'));
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
    <Wrapper expand={isOpen}>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <AvatarWrapper>
          <Avatar htmlFor="avatar">
            <img src={resolveAvatarPath(getValues('avatarUrl'), AvatarIcon)} alt={t('common.alt.avatar')} />
            <input
              type="file"
              id="avatar"
              hidden
              onChange={changeProfile}
              accept="image/*"
            />
          </Avatar>
          <Info>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
          </Info>
        </AvatarWrapper>
        <ActionWrapper>
          <ActionItem mobile><SettingIcon /></ActionItem>
          <ActionItem desktop>{t('common.label.edit-profile')}</ActionItem>
          <ArrowDown24IconStyle expand={isOpen ? 1 : 0} />
        </ActionWrapper>
      </Header>{t('common.text.avatar')}
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
    </Wrapper>
  );
};

InformationSetting.propTypes = {
  user: PropTypes.object.isRequired,
};

export default InformationSetting;
