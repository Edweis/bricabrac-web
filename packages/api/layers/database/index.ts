import knex from 'knex';
import { DATABASE_CONNECTION } from './constants';

export default knex({
  client: 'pg',
  connection: DATABASE_CONNECTION,
});
