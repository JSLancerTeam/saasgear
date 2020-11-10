import { getUserById, getUserByIdAndJoinUserToken } from '../../repository/user.repository.js';

export async function getProfileUserById(id) {
	const a = await getUserByIdAndJoinUserToken(id);
	console.log(a);
	return getUserById(id);
}
