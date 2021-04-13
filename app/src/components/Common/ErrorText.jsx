import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { COLORS } from '@/constants/style';

const Error = styled.p`
  font-size: 12px;
  color: ${COLORS.RED};
  margin: 5px 0 7px;
  display: block;
  ${({ position }) => css`
    text-align: ${position};
  `}
`;

function ErrorText({ message, position, ...props }) {
  return (
    <Error {...props} position={position}>
      {message}
    </Error>
  );
}

ErrorText.propTypes = {
  message: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right', 'center']),
};

ErrorText.defaultProps = {
  message: null,
  position: 'left',
};

export default ErrorText;
