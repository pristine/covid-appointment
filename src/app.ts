import '@babel/polyfill';

import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import api from './api';

const app = express();

app.use(helmet()); // security

app.use(express.static('assets')) // serve our static files like JS and CSS

app.set('trust proxy', 1); // ip related stuff
app.set('view engine', 'ejs'); // ejs for our templates

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

app.use('/api', api);

export default app;
