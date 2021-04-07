import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropsType from 'prop-types';
import styled from 'styled-components';

import { ContentPage, TitleContent } from '../Layout/blockStyle';
import { Table } from '../Common/Table';
import Button from '../Common/Button/Button';

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

export default function ListTeam({ teams }) {
  const history = useHistory();

  return (
    <ContentPage>
      <TitleContent> My Teams</TitleContent>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((it) => (
            <tr key={it.teamID}>
              <td>{it.teamName}</td>
              <ActionTd>
                <Link to={`/teams/edit/${it.teamID}`}>Edit</Link>
                <Link to="/teams">Delete</Link>
              </ActionTd>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddTeamBtn color="primary" onClick={() => history.push('/teams/new')}>
        Add Team
      </AddTeamBtn>
    </ContentPage>
  );
}
ListTeam.propTypes = {
  teams: PropsType.arrayOf(
    PropsType.shape({
      teamName: PropsType.string,
      teamID: PropsType.string,
    }),
  ),
};
