import React from 'react';
import PropTypes from 'prop-types';
import CreateNewTeam from "@/components/Team/CreateNewTeam";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignInSchema = yup.object().shape({
  teamName: yup.string().required('Team name is reqired'),
  teamID: yup.string().required('Team ID is required')
});

function InviteMember({ team }) {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      teamName: team.teamName,
      teamID: team.teamID
    }
  });

  function editTeam(params) {
    console.log(params)
  }

  return (
    <div className="border-2 p-8 rounded shadow-md mt-4">
      <div className="text-xl">Team Details</div>
      <CreateNewTeam
        onSubmit={handleSubmit(editTeam)}
        register={register}
        formErrors={formErrors}
        isEdit />
    </div >
  );
}
InviteMember.propTypes = {
  team: PropTypes.any
}

export default InviteMember;