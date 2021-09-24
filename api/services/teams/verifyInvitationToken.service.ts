import { ApolloError } from 'apollo-server-express';
import { GetDetailTeamInvitation, getDetailTeamInvitation } from '~/repository/team_invitations.repository';

export async function verifyInvitationToken(token: string): Promise<GetDetailTeamInvitation> {
  const [teamInvitation] = await getDetailTeamInvitation(token);
  if (!teamInvitation || teamInvitation.status === 'inactive') {
    throw new ApolloError('Token not valid');
  }
  return teamInvitation;
}
