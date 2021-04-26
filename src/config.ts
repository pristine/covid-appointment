import path from 'path';

import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
  allowEmptyValues: true,
});

export const config = {
  collectorUri: process.env.collectorUri,
  PORT: process.env.PORT,
};
