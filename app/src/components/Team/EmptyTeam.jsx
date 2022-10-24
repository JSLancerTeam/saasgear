import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Content>
      <MainContent>
        <Description>{t('team.text.click-button')}</Description>
        <Button color="primary" onClick={() => history.push('/teams/new')}>
          {t('team.text.create')}
        </Button>
      </MainContent>
    </Content>
  );
}
