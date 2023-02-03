import { Response } from 'express';

export const COOKIE_NAME = {
  TOKEN: 'token',
};

export function setAuthenticationCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAME.TOKEN, `Bearer ${token}`, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
}

export function clearCookie(res: Response, key: string): void {
  res.clearCookie(key);
}
