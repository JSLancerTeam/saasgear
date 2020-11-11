import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import Apollo from 'apollo-server-express';

import accessLogStream from './middlewares/logger.middleware.js';
import RootSchema from './graphql/root.schema.js';
import RootResolver from './graphql/root.resolver.js';
import getUserLogined from './services/authentication/getUserLogined.js';
const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
	optionsSuccessStatus: 200,
	credentials: true,
	origin: process.env.FRONTEND_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

(function startServer() {
	app.use(morgan('short', { stream: accessLogStream }));
	app.use(cors(corsOptions));
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});
	const serverGraph = new Apollo.ApolloServer({
		schema: Apollo.makeExecutableSchema({ typeDefs: RootSchema, resolvers: RootResolver }),
		context: async ({ req }) => {
			const bearerToken = req.headers.authorization;
			const user = await getUserLogined(bearerToken);
			return {
				user,
			};
		},
	});
	serverGraph.applyMiddleware({ app, cors: corsOptions });
	app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
})();
