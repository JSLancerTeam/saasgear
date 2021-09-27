import { findUser, UserProfile } from '~/repository/user.repository';

export async function getProfileUserById(id: number): Promise<UserProfile> {
  return findUser({ id });
}
