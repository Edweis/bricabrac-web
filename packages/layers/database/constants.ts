// if (process.env.NODE_ENV !== 'production') {
//   // @ts-ignore
//   import dotenv from 'dotenv';
//
//   const env = dotenv.config();
//   if (env.error) {
//     throw env.error;
//   }
// }
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
  pool: { min: 1, max: 7 },
  debug: process.env.NODE_ENV === 'development',
};
