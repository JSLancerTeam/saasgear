import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import InitDatabase from './constants/db.config.js';
import accessLogStream from './middlewares/logger.middleware.js';

const app = express();
const port = 3000;
dotenv.config();

app.use(morgan('short', { stream: accessLogStream }));

app.get('/', (req, res) => {
	console.log(InitDatabase);

	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
