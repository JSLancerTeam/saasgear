import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '@/constants/style';

type BadgeType = 'success' | 'error' | 'info';

type BadgeWrapper = {
  type: BadgeType;
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
  children: React.ReactNode;
  type: BadgeWrapper["type"];
}

const Badge: React.FC<Props> = ({ children, type }) => <BadgeWrapper type={type}>{children}</BadgeWrapper>;

Badge.defaultProps = {
  type: 'success',
};

export default React.memo(Badge);
