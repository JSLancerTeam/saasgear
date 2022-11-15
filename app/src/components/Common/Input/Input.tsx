import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/style';

const InputWrapper = styled.input`
  background: ${COLORS.LIGHT_GRAY};
  border: 1px solid ${COLORS.WHITE_BLUE};
  border-radius: 10px;
  padding: 10.5px 10px;

  font-size: 16px;
  line-height: 19px;
  color: ${COLORS.WHITE_GRAY};
  width: 100%;
  &:focus,
  &:active {
    border-color: ${COLORS.LIGHT_PRIMARY};
    outline: none;
  }

  &::placeholder {
    font-size: 16px;
    line-height: 19px;
    color: #bfc7e0;
  }
`;

type InputType = "text" | "number" | "email" | "tel" | "password";

type Props = {
  type?: InputType
  defaultValue?: string | number;
  placeholder?: string;
  [x: string]: unknown;
}

const Input = React.forwardRef(
  ({ type, defaultValue, placeholder, ...props }: Props, ref: React.Ref<HTMLInputElement>) => (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...props}
      ref={ref}
    />
  ),
);

Input.displayName = 'Input';

Input.defaultProps = {
  defaultValue: null,
  type: 'text',
  placeholder: null,
};

export default Input;
