import { updateTeamInvitation } from "../../repository/team_invitations.repository";
import { updateTeamMember } from "../../repository/team_members.repository";
import { findUser } from "../../repository/user.repository";
import database from '~/config/database.config';

export async function cancelInvitation(userId, teamId) {
  let transaction;
  try {
    transaction = await database.transaction();
    const user = await findUser({ id: userId });
    const queries = [];
    queries.push(updateTeamMember({
      team_id: teamId,
      user_id: userId,
    }, { status: 'inactive' }, transaction));

    queries.push(updateTeamInvitation({ email: user.email }, { status: 'inactive' }, transaction));
    await Promise.all(queries);
    await transaction.commit();
    return true;
  } catch (error) {
    transaction.rollback();
    throw new Error(error);
  }
}
