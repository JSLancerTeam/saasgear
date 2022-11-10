import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import type { Team } from "@/features/admin/team";
import { ContentPage, TitleContent } from '../Layout/blockStyle';
import { Table } from '../Common/Table';
import Button from '../Common/Button';

const ActionTd = styled.td`
  width: 20%;
  text-align: right;

  a {
    color: inherit;

    &:last-child {
      margin-left: 20px;
    }
  }
`;

const AddTeamBtn = styled(Button)`
  margin-top: 32px;
`;

type Props = {
  teams: Team[];
}

const ListTeam: React.FC<Props> = ({ teams }) => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <ContentPage>
      <TitleContent> {t('team.list-team')}</TitleContent>
      <Table>
        <thead>
          <tr>
            <th>{t('team.text.name')}</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((it) => (
            <tr key={it.teamID}>
              <td>{it.teamName}</td>
              <ActionTd>
                <Link to={`/teams/edit/${it.teamID}`}>{t('common.text.edit')}</Link>
                <Link to="/teams">{t('common.text.delete')}</Link>
              </ActionTd>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddTeamBtn color="primary" onClick={() => history.push('/teams/new')}>
        {t('team.text.add')}
      </AddTeamBtn>
    </ContentPage>
  );
}

export default ListTeam;