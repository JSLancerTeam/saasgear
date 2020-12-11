import React from 'react';
import { useForm } from 'react-hook-form';
import PropsType from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { addTeamMember } from "@/features/admin/team";

import InviteMemberForm from "@/components/Team/InviteMemberForm";
import ListTeamMember from "@/components/Team/ListTeamMember";

InviteMember.propTypes = {
  teamMembers: PropsType.arrayOf(
    PropsType.shape({
      teamName: PropsType.string,
      teamID: PropsType.string
    })
  ),
}

const inviteMemberSchema = yup.object().shape({
  emailMember: yup.string().required('Email is required').email('Email invalid')
});


function InviteMember({ teamMembers }) {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(inviteMemberSchema),
  });
  const dispatch = useDispatch()

  function onSubmit({ emailMember }) {
    const data = {
      id: teamMembers.length + 1,
      userName: emailMember,
      userRole: "member",
      isActive: false
    }
    dispatch(addTeamMember({ teamID: 'jslancer1', data }))
  }
  function onActionInlistMember(params) {
    console.log(params)
  }

  return (
    <div className="border-2 p-8 rounded shadow-md my-4">
      <div className="text-xl">Invite Team Members</div>
      <InviteMemberForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        formErrors={formErrors}
      />
      <div className="mt-4">
        <div className="text-xl mb-2">Pending Invitations</div>
        <ListTeamMember handleAction={onActionInlistMember} teamMembers={teamMembers} />
      </div>
    </div>
  );
}

export default InviteMember;