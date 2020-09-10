import knex from 'knex';
import { DATABASE_CONNECTION } from '../../constants';

console.debug('database sourced !!!!!');
export default knex(DATABASE_CONNECTION);
