import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../Common/Button';
import { Description } from '../Layout/blockStyle';

const Content = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const EmptyTeam: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Content>
      <MainContent>
        <Description>{t('Team.text.click-button')}</Description>
        <Button color="primary" onClick={() => history.push('/teams/new')}>
          {t('Team.text.create')}
        </Button>
      </MainContent>
    </Content>
  );
}

export default EmptyTeam
