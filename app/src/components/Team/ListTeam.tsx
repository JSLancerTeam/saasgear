import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import type { Team } from "@/features/admin/team";
import { Table } from '../Common/Table';
import Button from '../Common/Button';

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
    <div className="bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6">
      <h5 className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-8"> {t('Team.list_team')}</h5>
      <Table>
        <thead>
          <tr>
            <th>{t('Team.text.name')}</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((it) => (
            <tr key={it.teamID}>
              <td>{it.teamName}</td>
              <td className="w-1/5 text-right [&_a]:text-[inherit] [&_a:last-child]:ml-[20px]">
                <Link to={`/teams/edit/${it.teamID}`}>{t('Common.text.edit')}</Link>
                <Link to="/teams">{t('Common.text.delete')}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddTeamBtn color="primary" onClick={() => history.push('/teams/new')}>
        {t('Team.text.add')}
      </AddTeamBtn>
    </div>
  );
}

export default ListTeam;
