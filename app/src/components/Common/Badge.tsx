import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '@/constants/style';

type BadgeWrapper = {
  type: 'success' | 'error' | 'info';
}

const BadgeWrapper = styled.div<BadgeWrapper>`
  padding: 15px;
  text-align: center;
  display: block;
  margin: 10px 0;
  border-radius: 8px;
  ${({ type }) => {
    switch (type) {
      case 'error': {
        return css`
          background: ${COLORS.RED};
          color: ${COLORS.WHITE};
        `;
      }
      default: {
        return css`
          background: ${COLORS.GREEN};
          color: ${COLORS.WHITE};
        `;
      }
    }
  }}
`;

type Props = {
  type: BadgeWrapper["type"];
  children: React.ReactNode;
}

const Badge: React.FC<Props> = ({ children, type = 'success' }) => <BadgeWrapper type={type}>{children}</BadgeWrapper>;
export default React.memo(Badge);
