import pkg from 'bcryptjs';

const { compare, genSalt, hash } = pkg;

export async function generatePassword(passwordString) {
  const salt = await genSalt(10);
  return hash(passwordString, salt);
}

export function comparePassword(password, hashString) {
  return compare(password, hashString);
}
