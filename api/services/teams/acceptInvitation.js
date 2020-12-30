import { updateTeamInvitationByToken } from '../../repository/team_invitations.repository';
import { updateTeamMember } from '../../repository/team_members.repository';

export async function acceptInvitation(token) {
  await updateTeamInvitationByToken(token, { status: 'inactive' });
  await updateTeamMember({ invitation_token: token }, { status: 'active' });
  return true;
}
