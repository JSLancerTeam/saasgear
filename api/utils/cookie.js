export const COOKIE_NAME = {
  TOKEN: 'token',
};

export function setAuthenticationCookie(res, token) {
  res.cookie(COOKIE_NAME.TOKEN, `Bearer ${token}`, { maxAge: 60 * 60 * 24, httpOnly: true });
}

export function clearCookie(res, key) {
  res.clearCookie(key);
}
