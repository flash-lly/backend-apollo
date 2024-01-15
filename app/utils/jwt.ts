import jwt from 'jsonwebtoken';
import { configEnv } from '../config/config.env';

export interface UserJwtPayload {
  userId: string;
  role: any;
  email: string;
}

export const verifyJwt = (token?: string) => {
  if (!token) return null;

  try {
    return jwt.verify(token, configEnv.TOKEN_SECRET_KEY) as UserJwtPayload;
  } catch (error) {
    return null;
  }
};
