import camelCase from 'lodash.camelcase';
import mapKeys from 'lodash.mapkeys';
import isObject from 'lodash.isobject';
import { Config } from 'knex';

if (process.env.MAIN_DATABASE_PASSWORD == null)
  throw Error('MAIN_DATABASE_PASSWORD not defined');
if (process.env.MAIN_DATABASE_USERNAME == null)
  throw Error('MAIN_DATABASE_USERNAME not defined');

const toCamelCase = (object: { [key: string]: string }) =>
  isObject(object) ? mapKeys(object, (_value, key) => camelCase(key)) : object;

export const isDev =
  process.env.NODE_ENV === 'development' || process.env.IS_OFFLINE === 'true';

export const DATABASE_CONNECTION: Config = {
  client: 'pg',
  connection: {
    host: 'database.kapochamo.com',
    password: process.env.MAIN_DATABASE_PASSWORD,
    user: process.env.MAIN_DATABASE_USERNAME,
    database: process.env.MAIN_DATABASE_NAME,
  },
  pool: { min: 1, max: 7 },
  // debug: isDev,
  postProcessResponse: (result, queryContext) => {
    console.debug('QUERY', { result, queryContext });
    if (Array.isArray(result)) {
      const ret = result.map(toCamelCase);
      console.log('QUERY formated', ret);
      return ret;
    }
    const ret = toCamelCase(result);
    console.log('QUERY formated', ret);
    return ret;
  },
};
