import fs from 'fs';
import path from 'path';

const env =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'logs', `${env}.log`),
  { flags: 'a' },
);

export default accessLogStream;
