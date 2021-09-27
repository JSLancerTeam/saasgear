import { getUserPlanByUserId, UserPlanData } from '~/repository/user_plans.repository';
// import { cancelSubcription } from '~/services/stripe/subcription.service';
import { getToken } from '~/repository/user_tokens.repository';
import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
import { UserProfile } from '~/repository/user.repository';

type Token = {
  id?: number;
  user_id?: number;
  token?: string;
  type?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function deleteUser(currentUser: UserProfile): Promise<boolean> {
  const tokens = await getToken({ user_id: currentUser.id });
  const userPlan = await getUserPlanByUserId(currentUser.id);

  const activeTokens = tokens.filter((token) => token.is_active);

  const pms = [disableAllField(currentUser, activeTokens)];
  if (userPlan) {
    //  TODO CANCEL SUBCRIPTION
  }

  await Promise.all(pms);
  return true;
}

function disableAllField(user: UserProfile, tokens: Token[], userPlan: UserPlanData = null): Promise<unknown> {
  return database.transaction((trx) => {
    const queries = [];
    queries.push(database(TABLES.users).where({ id: user.id }).update({ deleted_at: new Date() }).transacting(trx));

    if (tokens.length > 0) {
      tokens.forEach((token) => {
        queries.push(database(TABLES.userTokens).where({ id: token.id }).update({ is_active: false }).transacting(trx));
      });
    }

    if (userPlan) {
      //  TODO DELETE USERPLAIN
    }

    Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });
}
