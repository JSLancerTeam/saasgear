import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import updateProfileQuery from '@/queries/user/updateProfile';
import AccountForm from '@/components/Profile/AccountForm';
import AvatarIcon from '@/assets/images/avatar.jpg';
import { COLORS } from '@/constants/style';
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

const Avatar = styled.div`
  width: 62px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 100%;
    width: 100%;
  }
`;

const Info = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
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

  span {
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
    margin-right: 14px;
    color: ${COLORS.LIGHT_PRIMARY};
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
  name: yup.string().required('Name is required'),
});

const InformationSetting = ({ user }) => {
  const { register, handleSubmit, errors } = useForm({
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
        toast.success('Update profile successfully!');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Wrapper expand={isOpen}>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <AvatarWrapper>
          <Avatar>
            <img src={AvatarIcon} alt="avatar" />
          </Avatar>
          <Info>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
          </Info>
        </AvatarWrapper>
        <ActionWrapper>
          <span>Edit Profile</span>
          <ArrowDown24IconStyle expand={isOpen ? 1 : 0} />
        </ActionWrapper>
      </Header>
      <AccountForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        loading={loading}
        errors={errors}
        apiError={error?.message}
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
