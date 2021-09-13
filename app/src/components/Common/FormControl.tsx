/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

const FormControlWrapper = styled.div`
  width: 100%;
  display: block;
`;

interface Props {
  className?: string,
  children: React.ReactNode,
  [x: string]: unknown
}

const FormControl: React.FC<Props> = ({ className, children, ...props }) => (
  <FormControlWrapper className={className} {...props}>
    {children}
  </FormControlWrapper>
)

FormControl.defaultProps = {
  className: "",
};

export default React.memo(FormControl);
