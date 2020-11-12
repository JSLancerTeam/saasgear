import { getUserById } from '../../repository/user.repository.js';

export async function getProfileUserById(id) {
	return getUserById(id);
}
