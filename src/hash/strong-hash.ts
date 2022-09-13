import { pbkdf2Sync, randomBytes } from 'crypto';

export const strongHash = (input: string): string => {
  const buffer = pbkdf2Sync(input, randomBytes(64), 2000000, 64, 'sha512');
  return buffer.toString('base64');
};
