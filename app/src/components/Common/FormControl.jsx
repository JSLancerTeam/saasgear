import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const FormControlWrapper = styled.div`
  width: 100%;
  display: block;
`;

function FormControl({ className, children, ...props }) {
  return (
    <FormControlWrapper className={className} {...props}>
      {children}
    </FormControlWrapper>
  );
}

FormControl.propTypes = {
  className: propTypes.string,
  children: propTypes.node,
};

FormControl.defaultProps = {
  className: null,
};

export default React.memo(FormControl);
