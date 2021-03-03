import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const IconBack = styled.div`
  text-align: left;
  margin-bottom: 16px;
  display: block;
`

function GoBack({
  link,
}) {
  const history = useHistory();

  function goBack() {
    if (link) {
      return history.push(link);
    }
    return history.goBack();
  }

  return (
    <IconBack onClick={goBack}>
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 7H1" stroke="#7C88B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 13L1 7L7 1" stroke="#7C88B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </IconBack>
  )
}

GoBack.propTypes = {
  link: PropTypes.string
}

GoBack.defaultProps = {
  link: null
}

export default React.memo(GoBack);
