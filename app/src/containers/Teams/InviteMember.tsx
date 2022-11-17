import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import type { ITeamMember } from "@/features/admin/team";
import { addTeamMember } from '@/features/admin/team';
import InviteMemberForm from '@/components/Team/InviteMemberForm';
import ListTeamMember from '@/components/Team/ListTeamMember';
import InviteMemberQuery from '@/queries/teams/inviteMember';

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
    <div className="bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6">
      <h5 className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-8">{t('Team.invite')}</h5>
      <InviteMemberForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        formErrors={formErrors}
        isSubmiting={loading}
        apiError={error?.message}
      />
      {teamMembers && teamMembers.length > 0 && (
        <div className="mt-8">
          <h5 className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-8">{t('Team.text.pending')}</h5>
          <ListTeamMember
            handleAction={onActionInlistMember}
            teamMembers={teamMembers}
          />
        </div>
      )}
    </div>
  );
}

export default InviteMember;
