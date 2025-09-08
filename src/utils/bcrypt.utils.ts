import { compare, hash } from 'bcrypt';
export async function hashPassword(password: string): Promise<string> {
  return hash(password, parseInt(process.env.SALT_HASH, 10));
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}
