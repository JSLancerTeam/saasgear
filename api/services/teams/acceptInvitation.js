import { updateTeamInvitation } from '../../repository/team_invitations.repository';
import { updateTeamMember } from '../../repository/team_members.repository';

export async function acceptInvitation(token, type) {
  const status = type === 'accept' ? 'active' : 'decline';
  await updateTeamInvitation({ token }, { status: 'inactive' });
  await updateTeamMember({ invitation_token: token }, { status });
  return true;
}
