import { findRecordByToken, activeUserToken } from '../../repository/user_token.repository.js';
import { activeUser } from '../../repository/user.repository.js';
import pkg from 'apollo-server-express';
const { ApolloError } = pkg;

function isValidDate(createdAt) {
	const tokenDate = new Date(createdAt);
	const now = new Date().getTime();
	const limitDate = tokenDate.setDate(tokenDate.getDate() + 7);
	return limitDate - now > 0;
}

export async function verifyEmail(token) {
	const record = await findRecordByToken(token);
	if (record) {
		if (isValidDate(record.created_at)) {
			await activeUserToken(record.id);
			await activeUser(record.user_id);
			return {
				verified: true,
			};
		} else {
			throw new ApolloError('Token has expired');
		}
	} else {
		return {
			verified: false,
		};
	}
}
