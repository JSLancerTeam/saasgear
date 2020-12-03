import { getUserPlanByUserId } from '~/repository/user_plans.repository';
// import { cancelSubcription } from '~/services/stripe/subcription.service';
import { getToken } from '~/repository/user_tokens.repository';
import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

export async function deleteUser(currentUser) {
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

function disableAllField(user, tokens, userPlan) {
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
