import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/style';

const InputWrapper = styled.span`
  position: relative;
  width: 24px;
  height: 24px;
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${COLORS.LIGHT_WHITE_GRAY};
`;

const CheckMark = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: ${COLORS.WHITE};
  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 8px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: 1px solid ${COLORS.WHITE};
    border-width: 0 2px 2.3px 0;
    transform: rotate(45deg);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ ${/* sc-selector */ CheckMark} {
    background-color: ${COLORS.SEMI_PRIMARY};
  }
  &:checked ~ ${/* sc-selector */ CheckMark}::after {
    display: block;
  }
`;

type InputType = 'checkbox' | 'radio';

type Props = {
  type?: InputType;
  defaultChecked?: boolean;
  placeholder?: string;
  id: string;
  [x: string]: unknown;
}

const Checkbox = React.forwardRef(
  ({ type, defaultChecked, placeholder, id, ...props }: Props, ref: React.Ref<HTMLInputElement>) => (
    <InputWrapper>
      <Input
        type={type}
        defaultChecked={defaultChecked}
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={id}
      />
      <CheckMark htmlFor={id} />
    </InputWrapper>
  ),
);

Checkbox.displayName = 'Input';

Checkbox.defaultProps = {
  defaultChecked: false,
  type: 'text',
  placeholder: null,
};

export default React.memo(Checkbox);
