import React from 'react';

import type { ITeamMember } from "@/features/admin/team";
import { ContentPage, TitleContent } from '@/components/Layout/blockStyle';
import ListTeamMember from '@/components/Team/ListTeamMember';

type Props = {
  teamMembers: ITeamMember[];
}

const TeamMember: React.FC<Props> = ({ teamMembers }) => (
  <ContentPage>
    <TitleContent>Team Members</TitleContent>
    <ListTeamMember teamMembers={teamMembers} />
  </ContentPage>
);

export default TeamMember;
