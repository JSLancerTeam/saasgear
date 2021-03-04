import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import goBackIcon from '@/assets/images/svg/back.svg';

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
      <img src={goBackIcon} alt=""/>
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
