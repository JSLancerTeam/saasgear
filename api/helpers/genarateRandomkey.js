import { randomBytes } from 'crypto'

const generateRandomKey = () => {
  return new Promise((resolve, reject) => {
    randomBytes(32, (error, buf) => {
      if (error) {
        return reject(error);
      }
      const token = buf.toString('hex');
      return resolve(token);
    });
  });
}

export default generateRandomKey;
