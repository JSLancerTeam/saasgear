import React from 'react';
import { useForm } from 'react-hook-form';
import PropsType from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import type { TeamMembers } from "@/features/admin/team";

import { addTeamMember } from '@/features/admin/team';
import InviteMemberForm from '@/components/Team/InviteMemberForm';
import ListTeamMember from '@/components/Team/ListTeamMember';
import InviteMemberQuery from '@/queries/teams/inviteMember';
import { ContentPage, TitleContent } from '@/components/Layout/blockStyle';

const ListInvitation = styled.div`
  margin-top: 32px;
`;

const inviteMemberSchema = yup.object().shape({
  emailMember: yup
    .string()
    .required('Email is required')
    .email('Email invalid'),
});

type Payload = {
  emailMember: string;
}

type Props = {
  teamMembers: TeamMembers[];
  alias: string;
}

const InviteMember: React.FC<Props> = ({ teamMembers, alias }) => {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(inviteMemberSchema),
  });
  const dispatch = useDispatch();
  const [InviteMemberMutation, { loading, error }] = useMutation(
    InviteMemberQuery,
  );

  async function onSubmit({ emailMember }: Payload) {
    try {
      const { data } = await InviteMemberMutation({
        variables: {
          email: emailMember,
          alias,
        },
      });
      if (data?.inviteMember) {
        const member = data.inviteMember;
        dispatch(addTeamMember({ teamID: alias, data: member }));
      }
    } catch (e) {
      console.log(error);
      setTimeout(() => console.log(error), 50);
      toast.error(e.message);
      console.log(JSON.stringify(e, null, 2));
    }
  }
  function onActionInlistMember(params: string) {
    console.log(params);
  }

  return (
    <ContentPage>
      <TitleContent>Invite Team Members</TitleContent>
      <InviteMemberForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        formErrors={formErrors}
        isSubmiting={loading}
        apiError={error?.message}
      />
      {teamMembers && teamMembers.length > 0 && (
        <ListInvitation>
          <TitleContent>Pending Invitations</TitleContent>
          <ListTeamMember
            handleAction={onActionInlistMember}
            teamMembers={teamMembers}
          />
        </ListInvitation>
      )}
    </ContentPage>
  );
}

// InviteMember.propTypes = {
//   alias: PropsType.string.isRequired,
//   teamMembers: PropsType.arrayOf(
//     PropsType.shape({
//       teamName: PropsType.string,
//       teamID: PropsType.string,
//     }),
//   ),
// };

export default InviteMember;
