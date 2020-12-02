import { findUser } from '~/repository/user.repository';

export async function getProfileUserById(id) {
  return findUser({ id });
}
