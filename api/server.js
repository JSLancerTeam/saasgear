import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import Apollo from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

import accessLogStream from './middlewares/logger.middleware.js';
import RootSchema from './graphql/root.schema.js';
import RootResolver from './graphql/root.resolver.js';
const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

const server = new Apollo.ApolloServer({ schema: Apollo.makeExecutableSchema({ typeDefs: RootSchema, resolvers: RootResolver }) });
app.use(morgan('short', { stream: accessLogStream }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

server.applyMiddleware({ app, cors: corsOptions });
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`);
});
