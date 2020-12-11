import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/react-hooks';

import TeamForm from "@/components/Team/TeamForm";
import { addNew } from "@/features/admin/team";
import createTeamQuery from "@/queries/teams/createNewTeam";

const TeamSchema = yup.object().shape({
  teamName: yup.string().required('Team name is reqired'),
  teamID: yup.string().required('Team ID is required')
});


export default function NewTeam() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(TeamSchema),
  });
  const [createTeamMutation, { loading, error }] = useMutation(createTeamQuery);

  async function createTeam({ teamName, teamID }) {
    const { data, errors } = await createTeamMutation({
      variables: { name: teamName, alias: teamID }
    })
    const { id, name, alias } = data.createTeam
    dispatch(addNew({ data: { id, teamName: name, teamID: alias } }))
    if (!errors) {
      history.replace('/teams')
    }
  }

  return (
    <div className="border-2 p-8 rounded shadow">
      <div className="text-xl">Team Details</div>
      <TeamForm onSubmit={handleSubmit(createTeam)} register={register} formErrors={formErrors} loading={loading} />
      {error?.message && (
        <p className="text-red-500 text-xs italic mt-1">{error.message}</p>
      )}
    </div>
  )
}
