import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS, mobileQuery } from '@/constants/style';

const InputWrapper = styled.div``;

const Label = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  opacity: 0.9;
  color: ${COLORS.WHITE_BLUE};
  margin-bottom: 11px;
  text-transform: uppercase;

  ${mobileQuery} {
    margin-top: 11px;
  }
`;

const Input = styled.input`
  display: none;

  &:checked + label {
    background: ${COLORS.GREEN};
  }

  &:checked + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

const LabelInput = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 46px;
  height: 24px;
  background: ${COLORS.GRAY};
  display: block;
  border-radius: 8px;
  position: relative;

  &:active:after {
    width: 25px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 6px;
    transition: 0.3s;
  }
`;

const Toggle = forwardRef(({ defaultChecked, label, ...props }, ref) => (
  <InputWrapper>
    {label && <Label>{label}</Label>}
    <Input
      type="checkbox"
      defaultChecked={defaultChecked}
      {...props}
      ref={ref}
      id="switch"
    />
    <LabelInput htmlFor="switch" />
  </InputWrapper>
));

Toggle.propTypes = {
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
};

export default React.memo(Toggle);
