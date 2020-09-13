import camelCase from 'lodash.camelcase';
import mapKeys from 'lodash.mapkeys';
import { Config } from 'knex';

if (process.env.MAIN_DATABASE_PASSWORD == null)
  throw Error('MAIN_DATABASE_PASSWORD not defined');
if (process.env.MAIN_DATABASE_USERNAME == null)
  throw Error('MAIN_DATABASE_USERNAME not defined');

const toCamelCase = (object: { [key: string]: string }) =>
  mapKeys(object, (value, key) => camelCase(key));

export const DATABASE_CONNECTION: Config = {
  client: 'pg',
  connection: {
    host: 'database.kapochamo.com',
    password: process.env.MAIN_DATABASE_PASSWORD,
    user: process.env.MAIN_DATABASE_USERNAME,
    database: process.env.MAIN_DATABASE_NAME,
  },
  pool: { min: 1, max: 7 },
  // debug:
  //   process.env.NODE_ENV === 'development' || process.env.IS_OFFLINE === 'true',
  postProcessResponse: (result) => {
    console.debug(result);
    if (Array.isArray(result)) {
      return result.map(toCamelCase);
    }
    return toCamelCase(result);
  },
};
