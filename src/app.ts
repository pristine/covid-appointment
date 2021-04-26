import '@babel/polyfill';

import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { handler } from './api';

const app = express();

app.use(helmet());
app.set('trust proxy', 1);

app.use(
  bodyParser.json({
    limit: '100kb',
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post(`/example`, handler);

export default app;
