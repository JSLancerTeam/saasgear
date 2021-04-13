import React from 'react';
import { COLORS } from '@/constants/style';
import styled from 'styled-components';

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
  return (
    <LogoHeader>
      <LogoHeaderName>SaaS</LogoHeaderName>
      <span>gear</span>
    </LogoHeader>
  );
}

export default Logo;
