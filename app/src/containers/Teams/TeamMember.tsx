import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ITeamMember } from "@/features/admin/team";
import { ContentPage, TitleContent } from '@/components/Layout/blockStyle';
import ListTeamMember from '@/components/Team/ListTeamMember';

type Props = {
  teamMembers: ITeamMember[];
}

const TeamMember: React.FC<Props> = ({ teamMembers }) => {
  const { t } = useTranslation();
  return(
    <ContentPage>
      <TitleContent>{t('team.members')}</TitleContent>
      <ListTeamMember teamMembers={teamMembers} />
    </ContentPage>
  );
};
export default TeamMember;
