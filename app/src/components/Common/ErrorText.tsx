import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '@/constants/style';

const Error = styled.p<{position: string | undefined}>`
  font-size: 12px;
  color: ${COLORS.RED};
  margin: 5px 0 7px;
  display: block;
  ${({ position }) => css`
    text-align: ${position};
  `}
`;

interface Props {
  message?: string,
  position?: string
}

const ErrorText: React.FC<Props> = ({ message, position, ...props }) => (
  <Error {...props} position={position}>
    {message}
  </Error>
)

ErrorText.defaultProps = {
  message: "",
  position: 'left',
};

export default ErrorText;
