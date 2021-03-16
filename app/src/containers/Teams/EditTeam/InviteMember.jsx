import React from 'react';
import { useForm } from 'react-hook-form';
import PropsType from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useMutation } from '@apollo/react-hooks';

import { addTeamMember, removeTeamMember } from "@/features/admin/team";
import InviteMemberForm from "@/components/Team/InviteMemberForm";
import ListTeamMember from "@/components/Team/ListTeamMember";
import InviteMemberQuery from "@/queries/teams/inviteMember";
import CancelInvitationQuery from "@/queries/teams/cancelInvitation";

InviteMember.propTypes = {
  alias: PropsType.string.isRequired,
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


function InviteMember({ teamMembers, alias }) {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(inviteMemberSchema),
  });
  const dispatch = useDispatch()
  const [InviteMemberMutation, { loading, error }] = useMutation(InviteMemberQuery);
  const [CancelInvitationMutation] = useMutation(CancelInvitationQuery);

  async function onSubmit({ emailMember }) {
    try {
      const { data } = await InviteMemberMutation({
        variables: {
          email: emailMember,
          alias
        }
      })
      if (data?.inviteMember) {
        const member = data.inviteMember
        dispatch(addTeamMember({ teamID: alias, data: [member] }))
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function onActionInlistMember({ type, member }) {
    if (type === 'cancel') {
      await CancelInvitationMutation({ variables: { userId: member.userId, teamId: member.teamId } })
      dispatch(removeTeamMember({ teamId: alias, memberId: member.userId }))
    }

  }

  return (
    <div className="border-2 p-8 rounded shadow-md my-4">
      <div className="text-xl">Invite Team Members</div>
      <InviteMemberForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        formErrors={formErrors}
        apiError={error?.message}
        loading={loading}
      />
      <div className="mt-4">
        <div className="text-xl mb-2">Pending Invitations</div>
        <ListTeamMember handleAction={onActionInlistMember} teamMembers={teamMembers} />
      </div>
    </div>
  );
}

export default InviteMember;