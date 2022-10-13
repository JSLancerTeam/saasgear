import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { COLORS } from '@/constants/style';

const LogoHeader = styled.div`
  font-size: 21.6px;
  line-height: 26px;
  color: ${COLORS.PRIMARY};
  font-weight: 500;
  margin-bottom: 7px;
`;

const LogoHeaderName = styled.span`
  font-weight: 800;
`;

function Logo() {
  const { t } = useTranslation();

  return (
    <LogoHeader>
      <LogoHeaderName>{t('common.logo.saas')}</LogoHeaderName>
      <span>{t('common.logo.gear')}</span>
    </LogoHeader>
  );
}

export default Logo;
