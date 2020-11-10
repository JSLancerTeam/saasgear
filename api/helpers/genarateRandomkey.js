import { v4 } from 'uuid';

export function generateRandomKey() {
	return v4().split('-').join('').substr(4, 5);
}
