import knex from '@layers/database';
import res from '../response';

export const handler = async () => {
  const results = await knex('concept').select();
  return res.success(results);
};
