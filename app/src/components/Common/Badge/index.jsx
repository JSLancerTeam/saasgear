import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import { COLOR } from '@/constants/style';

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
          background: ${COLOR.RED};
          color: ${COLOR.WHITE};
        `;
      }
      default: {
        return css`
          background: ${COLOR.GREEN};
          color: ${COLOR.WHITE};
        `;
      }
    }
  }}
`

function Badge({
  children,
  type
}) {
  return (
    <BadgeWrapper type={type}>{children}</BadgeWrapper>
  )
}

Badge.propTypes = {
  children: propTypes.node,
  type: propTypes.oneOf(['success', 'error', 'info'])
}

Badge.defaultProps = {
  type: 'success',
}

export default React.memo(Badge);
