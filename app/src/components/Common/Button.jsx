import PropTypes from 'prop-types';
import { COLORS } from '@/constants/style';
import React from 'react';
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.button`
  background: ${COLORS.LIGHT_PRIMARY};
  border-radius: 8px;
  padding: 10.5px 20px;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  border: 1px solid ${COLORS.LIGHT_PRIMARY};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  ${({ color }) => {
    switch (color) {
      case 'primary': {
        return css`
          background: ${COLORS.LIGHT_PRIMARY};
          border-radius: 8px;
          color: #fff;
        `;
      }
      default: {
        return css`
          border-color: ${COLORS.LIGHT_PRIMARY};
          background: #fff;
          color: ${COLORS.LIGHT_PRIMARY};
        `;
      }
    }
  }}
`;

function Button({ color, type, children, ...props }) {
  return (
    <ButtonWrapper type={type} color={color} {...props}>
      {children}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'default']),
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node,
};

Button.defaultProps = {
  color: 'default',
  type: 'button',
};

export default React.memo(Button);
