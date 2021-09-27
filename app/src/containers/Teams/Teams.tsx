/* eslint-disable import/no-unresolved */
import React from 'react';
import { TitlePage } from '@/components/Layout/blockStyle';
import { Route, Switch } from 'react-router-dom';
import TeamDetail from './TeamDetail';
import EditTeam from './EditTeam';
import ListTeam from './ListTeam';

const Teams: React.FC = () => (
  <div>
    <TitlePage>Teams</TitlePage>
    <Switch>
      <Route path="/teams/new" exact component={TeamDetail} />
      <Route path="/teams/edit/:teamId" exact component={EditTeam} />
      <Route component={ListTeam} />
    </Switch>
  </div>
);

export default Teams;