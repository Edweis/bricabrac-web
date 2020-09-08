// import dotenv from 'dotenv';
// import path from 'path';

// const envResult = dotenv.config({
//   path: path.resolve(__dirname, '.env'),
// });
// if (envResult.error) throw envResult.error;

if (process.env.MAIN_DATABASE_PASSWORD == null)
  throw Error('MAIN_DATABASE_PASSWORD not defined');
if (process.env.MAIN_DATABASE_USERNAME == null)
  throw Error('MAIN_DATABASE_USERNAME not defined');

export const DATABASE_CONNECTION = {
  client: 'pg',
  connection: {
    host: 'database.kapochamo.com',
    password: process.env.MAIN_DATABASE_PASSWORD,
    user: process.env.MAIN_DATABASE_USERNAME,
    database: 'postgres',
  },
  debug: process.env.NODE_ENV === 'development',
};
