import dotenvSafe from 'dotenv-safe';

dotenvSafe.config({
  allowEmptyValues: true,
});

export const config = {
  PORT: process.env.PORT,
};
