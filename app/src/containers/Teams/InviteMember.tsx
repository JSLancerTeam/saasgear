import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import type { ITeamMember } from "@/features/admin/team";
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
    .required('Common.validation.require_email')
    .email('Common.validation.valid_email'),
});

type Payload = {
  emailMember: string;
}

type Props = {
  teamMembers: ITeamMember[];
  alias: string;
}

const InviteMember: React.FC<Props> = ({ teamMembers, alias }) => {
  const { t } = useTranslation();
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
        dispatch(addTeamMember({ teamID: alias, data: [member] }));
      }
    } catch (e: any) {
      setTimeout(() => console.log(error), 50);
      toast.error(e.message);
      console.log(JSON.stringify(e, null, 2));
    }
  }
  function onActionInlistMember(params: unknown) {
    console.log(params);
  }

  return (
    <ContentPage>
      <TitleContent>{t('Team.invite')}</TitleContent>
      <InviteMemberForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        formErrors={formErrors}
        isSubmiting={loading}
        apiError={error?.message}
      />
      {teamMembers && teamMembers.length > 0 && (
        <ListInvitation>
          <TitleContent>{t('Team.text.pending')}</TitleContent>
          <ListTeamMember
            handleAction={onActionInlistMember}
            teamMembers={teamMembers}
          />
        </ListInvitation>
      )}
    </ContentPage>
  );
}

export default InviteMember;
