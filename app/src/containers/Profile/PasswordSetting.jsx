import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import SecurityForm from '@/components/Profile/SecurityForm';
import changePasswordQuery from '@/queries/auth/changePassword';
import { COLORS, mobileQuery } from '@/constants/style';
import { ReactComponent as ArrowDown24Icon } from '@/assets/images/svg/arrow-down-24.svg';
import { ReactComponent as SettingIcon } from '@/assets/images/svg/setting.svg';
import { t } from 'i18next';

const Wrapper = styled.div`
  max-height: 90px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;

  ${(props) => props.expand && css`
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

const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.p`
  font-size: 16px;
  line-height: 26px;
  color: ${COLORS.SAPPHIRE_BLUE};
`;

const SubDesc = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${COLORS.WHITE_GRAY};
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
    text-align: left;
    display: ${(props) => props.mobile ? 'block' : 'none'};
  }
`;

const ArrowDown24IconStyle = styled(ArrowDown24Icon)`
  transform: rotate(0);
  transition: transform 0.3s ease;

  ${(props) => props.expand && css`
    transform: rotate(-180deg);
  `}
`;

const PasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('common.validation.require-current-password'),
  newPassword: yup.string().required('common.validation.require-new-password').min(6, 'common.validation.min-password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'common.validation.password-match'),
});

const PasswordSetting = () => {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(PasswordSchema),
  });
  const [changePasswordMutation, { error, loading }] = useMutation(changePasswordQuery);
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(params) {
    const { data } = await changePasswordMutation({ variables: params });
    if (data?.changePassword) {
      toast.success(t('common.status.change-password-success'))
    }
  }

  return (
    <Wrapper expand={isOpen}>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <SubTitleWrapper>
          <SubTitle>{t('profile.text.change-password')}</SubTitle>
          <SubDesc>{t('profile.text.change-password-desc')}</SubDesc>
        </SubTitleWrapper>
        <ActionWrapper>
          <ActionItem mobile><SettingIcon /></ActionItem>
          <ActionItem desktop>{t('profile.text.update-password')}</ActionItem>
          <ArrowDown24IconStyle expand={isOpen ? 1 : 0} />
        </ActionWrapper>
      </Header>
      <SecurityForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        formErrors={formErrors}
        apiError={error?.message}
        isSubmitting={loading}
      />
    </Wrapper>
  )
}

export default PasswordSetting;