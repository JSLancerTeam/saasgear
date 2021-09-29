import pkg, { Algorithm } from 'jsonwebtoken';

type Payload = {
  email?: string;
  name?: string;
  createdAt?: string;
};

const { sign: jwtSign, verify: jwtVerify } = pkg;

const signOptions = {
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE,
  expiresIn: process.env.JWT_EXPIRESIN,
  algorithm: process.env.JWT_ALGORITHM as Algorithm,
};

function sign(payload: Payload): string {
  return jwtSign({ user: payload }, process.env.JWT_SECRET, signOptions);
}

function verify(token: string): string | pkg.JwtPayload {
  return jwtVerify(token, process.env.JWT_SECRET, signOptions);
}

export { sign, verify };
