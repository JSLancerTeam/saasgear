import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import TeamDetail from './TeamDetail';
import EditTeam from './EditTeam';
import ListTeam from './ListTeam';

const Teams: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="font-bold text-[26px] leading-9 text-sapphire_blue mb-8">
        {t('Common.title.teams')}
      </h3>
      <Switch>
        <Route path="/teams/new" exact component={TeamDetail} />
        <Route path="/teams/edit/:teamId" exact component={EditTeam} />
        <Route component={ListTeam} />
      </Switch>
    </div>
  );
};
export default Teams;