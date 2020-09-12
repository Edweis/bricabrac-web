import knex from '@layers/database';
import res from '../response';

export const handler = async () => {
  console.debug('FETCHING...');
  const results = await knex('concept').select();
  const xxx = res.success(results);
  console.debug('xxx', xxx);
  return xxx;
};
