import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '@/constants/style';

const InputWrapper = styled.input`
  background: ${COLOR.LIGHT_GRAY};
  border: 1px solid ${COLOR.WHITE_BLUE};
  border-radius: 10px;
  padding: 10.5px 10px;
  
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: ${COLOR.WHITE_GRAY};
  width: 100%;
  &:focus,
  &:active {
    border-color: ${COLOR.LIGHT_PRIMARY};
    outline: none;
  }
`

const Input = React.forwardRef(({
  type,
  defaultValue,
  placeHolder,
  ...props
}, ref) => (
  <InputWrapper type={type} defaultValue={defaultValue} placeholder={placeHolder} {...props} ref={ref} />
));

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
  placeHolder: PropTypes.string
}

Input.displayName = 'Input';

Input.defaultProps = {
  defaultValue: null,
  type: 'text',
  placeHolder: null
}

export default Input;
