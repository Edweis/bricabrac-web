import knex from '../layers/database';

export const handler = async () =>
  knex('concept')
    .select()
    .then(console.log)
    .then(() => knex.destroy());
