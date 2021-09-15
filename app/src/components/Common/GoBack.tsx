import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import goBackIcon from '@/assets/images/svg/back.svg';

const IconBack = styled.div`
  text-align: left;
  margin-bottom: 16px;
  display: block;
  cursor: pointer;
`;

type Props = {
  link?: string | null;
  to?: string | null;
  children?: React.ReactNode;
}

const GoBack: React.FC<Props> = ({ link }) => {
  const history = useHistory();

  function goBack() {
    if (link) {
      return history.push(link);
    }
    return history.goBack();
  }

  return (
    <IconBack onClick={goBack}>
      <img src={goBackIcon} alt="" />
    </IconBack>
  );
}

export default React.memo(GoBack);
