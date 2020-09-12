import knex from 'knex';
import { DATABASE_CONNECTION } from './constants';

export default knex(DATABASE_CONNECTION);
