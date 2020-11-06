import { getUserById } from '../../repository/user.repository.js';

export async function getProfileUserById(id) {
	const user = await getUserById(id);
	return user;
}
