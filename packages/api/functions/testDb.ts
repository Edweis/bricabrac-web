import knex from '@layers/database';

export const handler = async () => {
  console.debug('FETCHING...');
  await knex('concept').select().then(console.log);
};
