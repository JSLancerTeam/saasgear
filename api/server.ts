/* eslint-disable wrap-iife */
import dotenv from 'dotenv';
import { resolve, join } from 'path';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
require('module-alias/register');
import { ApolloServer, makeExecutableSchema, IResolvers, ApolloError } from 'apollo-server-express';
import { withScope, Severity, captureException, init } from '@sentry/node';
import accessLogStream from '~/middlewares/logger.middleware';
import RootSchema from './graphql/root.schema';
import RootResolver from './graphql/root.resolver';
import getUserLogined from './services/authentication/get-user-logined.service';
import stripeHooks from './services/stripe/webhooks.servive';

type ContextParams = {
  req: Request;
  res: Response;
};

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
  app.use(express.static(join(resolve(), 'public', 'uploads')));
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.send('Hello orld!');
  });
  app.post('/stripe-hooks', bodyParser.raw({ type: 'application/json' }), stripeHooks);

  const serverGraph = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: RootSchema,
      resolvers: RootResolver as IResolvers[],
    }),
    plugins: [
      {
        requestDidStart() {
          return {
            didEncounterErrors(ctx) {
              if (!ctx.operation) return;
              for (const err of ctx.errors) {
                if (err instanceof ApolloError) {
                  continue;
                }
                withScope((scope) => {
                  scope.setTag('kind', ctx.operation.operation);
                  scope.setExtra('query', ctx.request.query);
                  scope.setExtra('variables', ctx.request.variables);

                  if (err.path) {
                    scope.addBreadcrumb({
                      category: 'query-path',
                      message: err.path.join(' > '),
                      level: Severity.Debug,
                    });
                  }

                  const transactionId = ctx.request.http.headers.get('x-transaction-id');
                  if (transactionId) {
                    scope.setTransactionName(transactionId);
                  }
                  captureException(err);
                });
              }
            },
          };
        },
      },
    ],
    context: async ({ req, res }: ContextParams) => {
      const { cookies } = req;
      const bearerToken = cookies.token || null;
      const user = await getUserLogined(bearerToken, res);
      return {
        user,
        res,
      };
    },
  });

  serverGraph.applyMiddleware({ app, cors: corsOptions });
  init({ dsn: process.env.SENTRY_DSN });
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
})();
