import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import { COLORS } from '@/constants/style';

const BadgeWrapper = styled.div`
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

function Badge({ children, type }) {
  return <BadgeWrapper type={type}>{children}</BadgeWrapper>;
}

Badge.propTypes = {
  children: propTypes.node,
  type: propTypes.oneOf(['success', 'error', 'info']),
};

Badge.defaultProps = {
  type: 'success',
};

export default React.memo(Badge);
