import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from '../Common/Button';
import { Description, TitleContent } from '../Layout/blockStyle';

const Content = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

export default function EmptyTeam() {
  const history = useHistory();

  return (
    <Content>
      <MainContent>
        <Description>Click button below to create your first team!</Description>
        <Button color="primary" onClick={() => history.push('/teams/new')}>
          Create Team
        </Button>
      </MainContent>
    </Content>
  );
}
