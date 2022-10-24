import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PropsType from 'prop-types';
import { Table } from '../Common/Table';
import Button from '../Common/Button';

const ActionTd = styled.td`
  width: 20%;

  button:first-child {
    margin-right: 20px;
  }
`;

export default function ListTeamMember({ teamMembers, handleAction }) {
  const { t } = useTranslation();
  return (
    <Table>
      <thead>
        <tr>
          <th>{t('team.text.member')}</th>
          <th>{t('team.text.role')}</th>
        </tr>
      </thead>
      <tbody>
        {teamMembers ? (
          teamMembers.map((it) => (
            <tr key={it.userId}>
              <td width="70%">{it.email}</td>
              <td width="10%">{it.isOwner ? t('common.text.admin') : t('common.text.member')}</td>
              {handleAction && (
                <ActionTd>
                  <Button>{t('common.text.cancel')}</Button>
                  <Button color="primary">{t('team.text.invitation')}</Button>
                </ActionTd>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2}>{t('common.text.no-result')}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

ListTeamMember.propTypes = {
  teamMembers: PropsType.arrayOf(
    PropsType.shape({
      teamName: PropsType.string,
      teamID: PropsType.string,
    }),
  ),
  handleAction: PropsType.func,
};
