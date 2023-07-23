import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

// Secret key for JWT signing and encryption
const secretKey = randomBytes(32).toString('hex');

// Hashing password with bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Comparing password with hashed password
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}

// Generating JWT token
export function generateToken(userId: number, name: string): string {
  const token = jwt.sign({ userId: userId.toString(), name: name }, secretKey);
  return token;
}

// Verifying JWT token
export function verifyToken(token: string): string | object {
  const decodedToken = jwt.verify(token, secretKey);
  return decodedToken;
}
