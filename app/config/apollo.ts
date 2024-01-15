import { apolloContext, apolloFormatError } from '../utils/apollo.helpers';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import { Express } from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { notificationsResolver } from '../modules/notifications/notifications.resolver';
import { readFileSync } from 'fs';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import path from 'path';

const dirname = path.resolve();
const typeDefs = readFileSync(path.join(dirname, 'app', 'config', 'schema.graphql'), {
  encoding: 'utf-8',
});

const resolvers = {
  Query: {
    default: () => 'Hello World',
  },
  Subscription: {
    ...notificationsResolver.Subscription,
  },
};

export const creteApolloServer = (app: Express) => {
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer(
    {
      context: apolloContext,
      schema,
    },
    wsServer,
  );

  const apolloServer = new ApolloServer({
    schema,
    formatError: apolloFormatError,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  return { apolloServer, httpServer };
};
