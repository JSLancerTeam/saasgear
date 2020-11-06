import pkg from 'jsonwebtoken';
const { sign: jwtSign, verify: jwtVerify } = pkg;

const signOptions = {
	issuer: process.env.JWT_ISSUER,
	subject: process.env.JWT_SUBJECT,
	audience: process.env.JWT_AUDIENCE,
	expiresIn: process.env.JWT_EXPIRESIN,
	algorithm: process.env.JWT_ALGORITHM,
};

function sign(payload) {
	return jwtSign({ user: payload }, process.env.JWT_SECRET, signOptions);
}

function verify(token) {
	return jwtVerify(token, process.env.JWT_SECRET, signOptions);
}

export { sign, verify };
