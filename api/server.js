/* eslint-disable wrap-iife */
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import Apollo from 'apollo-server-express';
import Sentry from '@sentry/node';

import accessLogStream from './middlewares/logger.middleware';
import RootSchema from './graphql/root.schema';
import RootResolver from './graphql/root.resolver';
import getUserLogined from './services/authentication/get-user-logined.service';
import stripeHooks from './services/stripe/webhooks.servive';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

(function startServer() {
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(cors(corsOptions));
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.post('/stripe-hooks', bodyParser.raw({ type: 'application/json' }), stripeHooks);

  const serverGraph = new Apollo.ApolloServer({
    schema: Apollo.makeExecutableSchema({
      typeDefs: RootSchema,
      resolvers: RootResolver,
    }),
    plugins: [
      {
        requestDidStart() {
          return {
            didEncounterErrors(ctx) {
              if (!ctx.operation) return;
              for (const err of ctx.errors) {
                if (err instanceof Apollo.ApolloError) {
                  continue;
                }

                Sentry.withScope((scope) => {
                  scope.setTag('kind', ctx.operation.operation);
                  scope.setExtra('query', ctx.request.query);
                  scope.setExtra('variables', ctx.request.variables);

                  if (err.path) {
                    scope.addBreadcrumb({
                      category: 'query-path',
                      message: err.path.join(' > '),
                      level: Sentry.Severity.Debug,
                    });
                  }

                  const transactionId = ctx.request.http.headers.get('x-transaction-id');
                  if (transactionId) {
                    scope.setTransactionName(transactionId);
                  }
                  Sentry.captureException(err);
                });
              }
            },
          };
        },
      },
    ],
    context: async ({ req }) => {
      const bearerToken = req.headers.authorization;
      const user = await getUserLogined(bearerToken);
      return {
        user,
      };
    },
  });

  serverGraph.applyMiddleware({ app, cors: corsOptions });
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
})();
