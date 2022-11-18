import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ITeamMember } from "@/features/admin/team";
import ListTeamMember from '@/components/Team/ListTeamMember';

type Props = {
  teamMembers: ITeamMember[];
}

const TeamMember: React.FC<Props> = ({ teamMembers }) => {
  const { t } = useTranslation();
  return(
    <div className="bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6">
      <h5 className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-8">
        {t('Team.members')}
      </h5>
      <ListTeamMember teamMembers={teamMembers} />
    </div>
  );
};
export default TeamMember;
