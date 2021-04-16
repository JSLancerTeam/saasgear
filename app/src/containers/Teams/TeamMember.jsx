import React from 'react';
import PropsType from 'prop-types';

import { ContentPage, TitleContent } from '@/components/Layout/blockStyle';
import ListTeamMember from '@/components/Team/ListTeamMember';

export default function TeamMember({ teamMembers }) {
  return (
    <ContentPage>
      <TitleContent>Team Members</TitleContent>
      <ListTeamMember teamMembers={teamMembers} />
    </ContentPage>
  );
}

TeamMember.propTypes = {
  teamMembers: PropsType.arrayOf(
    PropsType.shape({
      teamName: PropsType.string,
      teamID: PropsType.string,
    }),
  ),
};
