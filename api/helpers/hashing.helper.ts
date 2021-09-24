import pkg from 'bcryptjs';

const { compare, genSalt, hash } = pkg;

export async function generatePassword(passwordString: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(passwordString, salt);
}

export function comparePassword(password: string, hashString: string): Promise<boolean> {
  return compare(password, hashString);
}
