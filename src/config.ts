import path from 'path';

import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  allowEmptyValues: true,
});

export const config = {
  PORT: process.env.PORT,
};
