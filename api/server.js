import express from 'express';
import morgan from 'morgan';

import Apollo from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

import accessLogStream from './middlewares/logger.middleware.js';
import RootSchema from './graphql/root.schema.js';
import RootResolver from './graphql/root.resolver.js';
const app = express();
const port = 3000;

const server = new Apollo.ApolloServer({ schema: Apollo.makeExecutableSchema({ typeDefs: RootSchema, resolvers: RootResolver }) });
app.use(morgan('short', { stream: accessLogStream }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

server.applyMiddleware({ app });
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`);
});
