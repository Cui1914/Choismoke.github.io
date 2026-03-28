import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export type PasswordHashResult = {
  hash: string;
  salt: string;
};

export async function hashPassword(password: string, salt?: string): Promise<PasswordHashResult> {
  const resolvedSalt = salt ?? randomBytes(16).toString("hex");
  const derived = (await scrypt(password, resolvedSalt, 64)) as Buffer;
  return {
    hash: derived.toString("hex"),
    salt: resolvedSalt,
  };
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const derived = await hashPassword(password, salt);
  const expected = Buffer.from(expectedHash, "hex");
  const actual = Buffer.from(derived.hash, "hex");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}
