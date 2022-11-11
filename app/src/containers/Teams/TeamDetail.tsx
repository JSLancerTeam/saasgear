import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import TeamForm from '@/components/Team/TeamForm';
import { addNew } from '@/features/admin/team';
import createTeamQuery from '@/queries/teams/createNewTeam';
import { ContentPage, TitleContent } from '@/components/Layout/blockStyle';
import ErrorText from '@/components/Common/ErrorText';
import type { Team } from "@/features/admin/team";
import { t } from 'i18next';

const TeamSchema = yup.object().shape({
  teamName: yup.string().required('Team.validation.require-team-name'),
  teamID: yup.string().required('Team.validation.require-team-id'),
});

type Props = {
  team: Team;
}

type TeamParams = {
  teamName?: string;
  teamID?: string;
}

const TeamDetail: React.FC<Props> = ({ team }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(TeamSchema),
    defaultValues: {
      teamName: team?.teamName,
      teamID: team?.teamID,
    },
  });
  const [createTeamMutation, { loading, error }] = useMutation(createTeamQuery);

  async function createTeam({ teamName, teamID }: TeamParams) {
    const { data, errors } = await createTeamMutation({
      variables: { name: teamName, alias: teamID },
    });
    if (data?.createTeam) {
      const { id, name, alias } = data.createTeam;
      dispatch(addNew({ data: { id, teamName: name, teamID: alias } }));
      if (!errors) {
        history.replace('/teams');
      }
    }
  }

  return (
    <ContentPage>
      <TitleContent>{t('Team.detail')}</TitleContent>
      <TeamForm
        onSubmit={handleSubmit(createTeam)}
        register={register}
        formErrors={formErrors}
        loading={loading}
        isEdit={!!team}
      />
      {error && <ErrorText>{t(`Team.error.${error?.graphQLErrors?.[0]?.extensions?.code}`)}</ErrorText>}
    </ContentPage>
  );
}

export default TeamDetail;