import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
import { teamsColumns } from './team.repository';
import { usersColumns } from './user.repository';

const TABLE = TABLES.teamInvitations;

export const VALID_PERIOD_DAYS = 14;

export const teamInvitationsColumns = {
  email: 'team_invitations.email',
  teamId: 'team_invitations.team_id',
  token: 'team_invitations.token',
  validUntil: 'team_invitations.valid_until',
  invitedBy: 'team_invitations.invited_by',
  status: 'team_invitations.status',
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

export async function getTeamInvitation(condition) {
  return database(TABLE).where(condition);
}

/**
 * Function to get team invitation by email, teamId and inviteUserId.
 *
 * @param string email        Email this invitation send to
 * @param int    teamId       Id of team related to this invitation
 * @param int    inviteUserId Id of user who create the invitation
 */
export async function getDetailTeamInvitation(token) {
  return database(TABLE)
    .join(TABLES.teams, function joinOn() {
      this.on(teamsColumns.id, '=', teamInvitationsColumns.teamId);
    })
    .join(TABLES.users, usersColumns.id, teamInvitationsColumns.invitedBy)
    .where({ [teamInvitationsColumns.token]: token })
    .select({
      owner: usersColumns.email,
      teamName: teamsColumns.name,
      until: teamInvitationsColumns.validUntil,
      status: teamInvitationsColumns.status,
    });
}

export async function updateTeamInvitationByToken(token, data) {
  return database(TABLE).where({ token }).update(data);
}
// select * from team_invitations
// inner join teams
// on teams.id = team_invitations.team_id
// inner join users on users.id = team_invitations.invited_by
// where team_invitations.token = '3235f68696b46196c00e5aa359273c909613b3514ce9fe819f594f0033421a6c'

// AND(team_invitations.token = '3235f68696b46196c00e5aa359273c909613b3514ce9fe819f594f0033421a6c')