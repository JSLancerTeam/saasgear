import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: 1px solid ${COLORS.WHITE};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`
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
`

const Checkbox = React.forwardRef(({
  type,
  defaultChecked,
  placeholder,
  id,
  ...props
}, ref) => (
  <InputWrapper>
    <Input type={type} defaultChecked={defaultChecked} placeholder={placeholder} {...props} ref={ref} id={id} />
    <CheckMark htmlFor={id} />
  </InputWrapper>
));

Checkbox.propTypes = {
  defaultChecked: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  type: PropTypes.oneOf(['checkbox', 'radio']),
  placeholder: PropTypes.string,
  id: PropTypes.string
}

Checkbox.displayName = 'Input';

Checkbox.defaultProps = {
  defaultChecked: false,
  type: 'text',
  placeholder: null
}

export default React.memo(Checkbox);
