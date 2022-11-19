import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ITeamMember } from "@/features/admin/team";
import Button from '../Common/Button';

type Props = {
  teamMembers: ITeamMember[];
  handleAction?: (params: unknown) => void;
}

const ListTeamMember: React.FC<Props> = ({ teamMembers, handleAction }) => {
  const { t } = useTranslation();
  return (
    <table className="w-full border-collapse [&_tr]:h-[56px] [&_th]:font-bold [&_th]:text-[12px] [&_th]:leading-[15px] [&_th]:tracking-[2px] [&_th]:uppercase [&_th]:text-white_blue [&_th]:text-left [&_td]:text-[14px] [&_td]:leading-6 [&_td]:text-sapphire_blue [&_tbody_tr:nth-child(even)]:bg-light_gray [&_tbody_tr:hover]:bg-regular_primary">
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
    </table>
  );
};

export default ListTeamMember;