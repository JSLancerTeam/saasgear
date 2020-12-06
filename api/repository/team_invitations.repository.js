import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.teamInvitations;

export const teamsColumns = {
  email: 'team_invitations.email',
  teamId: 'team_invitations.team_id',
  token: 'team_invitations.token',
  sendAt: 'teams.send_at',
  validUntil: 'teams.valid_until',
  invitedBy: 'teams.invited_by',
};

/**
 * Function to create team invitation
 *
 * @param object      data        Object contains invitations data
 * @param Transaction transaction Transaction object want to use within query
 */
export async function createTeamInvitation(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

/**
 * Function to get team invitation by email, teamId and inviteUserId.
 *
 * @param string email        Email this invitation send to
 * @param int    teamId       Id of team related to this invitation
 * @param int    inviteUserId Id of user who create the invitation
 */
export async function getTeamInvitation(email, teamId, inviteUserId) {
  return database(TABLE).where({ email, team_id: teamId, invited_by: inviteUserId }).first();
}
