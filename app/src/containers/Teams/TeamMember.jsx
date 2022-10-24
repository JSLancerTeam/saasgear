import React from 'react';
import PropsType from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ContentPage, TitleContent } from '@/components/Layout/blockStyle';
import ListTeamMember from '@/components/Team/ListTeamMember';

export default function TeamMember({ teamMembers }) {
  const { t } = useTranslation();

  return (
    <ContentPage>
      <TitleContent>{t('team.members')}</TitleContent>
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
