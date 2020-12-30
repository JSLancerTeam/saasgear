import { ApolloError } from 'apollo-server-express';
import { getDetailTeamInvitation } from '~/repository/team_invitations.repository';

export async function verifyInvitationToken(token) {
  const [teamInvitation] = await getDetailTeamInvitation(token);
  if (!teamInvitation || teamInvitation.status === 'inactive') {
    throw new ApolloError('Token not valid');
  }
  return teamInvitation;
}
