import knex from '../layers/database';

knex('test')
  .insert({ id: 12 })
  .returning('*')
  .then(console.log)
  .then(() => knex.destroy());
