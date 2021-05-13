import '@babel/polyfill';

import http from 'http';

import throng from 'throng';

import app from './app';

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const start = async () => {
  const server = http.createServer(app);

  server.listen(process.env.PORT || 8080, () => {
    console.info(`Started on port ${process.env.PORT || 8080}`);

    app.on('shutdown', () => process.exit(0));
  });
};

throng({
  start,
  workers: WORKERS,
  lifetime: Infinity,
});
