import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ITeamMember } from "@/features/admin/team";
import { Table } from '../Common/Table';
import Button from '../Common/Button';

type Props = {
  teamMembers: ITeamMember[];
  handleAction?: (params: unknown) => void;
}

const ListTeamMember: React.FC<Props> = ({ teamMembers, handleAction }) => {
  const { t } = useTranslation();
  return (
    <Table>
      <thead>
        <tr>
          <th>{t('Team.text.member')}</th>
          <th>{t('Team.text.role')}</th>
        </tr>
      </thead>
      <tbody>
        {teamMembers ? (
          teamMembers.map((it) => (
            <tr key={it.userId}>
              <td width="70%">{it.email}</td>
              <td width="10%">{it.isOwner ? 'admin' : 'member'}</td>
              {!!handleAction && (
                <td className="w-1/5 [&_button:first-child]:mr-[20px]">
                  <Button>{t('Common.text.cancel')}</Button>
                  <Button color="primary">{t('Team.text.invitation')}</Button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2}>{t('Common.text.no_result')}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ListTeamMember;