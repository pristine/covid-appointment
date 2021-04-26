import '@babel/polyfill';

import http from 'http';

import throng from 'throng';

import app from './app';
import { config } from './config';

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const start = async () => {
  try {
    require('./db');
  } catch (error) {
    // eslint-disable-next-line
    console.error('Unable to connect to databases');
    // Exit process if there are no db connections
    process.exit(1);
  }

  const server = http.createServer(app);

  server.listen(config.PORT || 8080, () => {
    console.info(`Started on port ${config.PORT || 8080}`);

    app.on('shutdown', () => process.exit(0));
  });
};

throng({
  start,
  workers: WORKERS,
  lifetime: Infinity,
});
