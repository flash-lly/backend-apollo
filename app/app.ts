import { adminimsRouter } from './modules/ko/adminims/adminims.routes';
import { configEnv } from './config/config.env';
import { creteApolloServer } from './config/apollo';
import { expressMiddleware } from '@apollo/server/express4';
import { notificationsRouter } from './modules/notifications/notifications.routes';

import cors from 'cors';
import express from 'express';


const app = express();

const requestIp = require('request-ip');
var ip = require('ip');
const config = require('./config/config');
let version = 'version 1.29 28-11 new pdf';

var corsOptions = {
  origin: config.frontURL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: "I'm in live",
  });
});

app.use('/admin', adminimsRouter);
app.use('/notification', notificationsRouter);


export const initApp = async () => {
  const { apolloServer, httpServer } = creteApolloServer(app);
  await apolloServer.start();
  //TODO: replace cors values with config ones just after tests
  app.use('/graphql', cors(corsOptions), expressMiddleware(apolloServer));

  httpServer.listen(configEnv.PORT);
  console.log("server running on PORT :",configEnv.PORT)
  return { apolloServer, httpServer };
};
