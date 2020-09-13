import * as Knex from 'knex';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
export async function seed(knex: Knex): Promise<void> {
  await knex('brick').del();
  await knex('concept').del();
  await knex('source').del();

  await knex('concept').insert([
    { id: 1, name: 'concept one' },
    { id: 2, name: 'concept two' },
    { id: 3, name: 'concept three' },
  ]);
  await knex('source').insert([
    { id: 1, name: 'source one' },
    { id: 2, name: 'source two' },
    { id: 3, name: 'source three' },
  ]);
  await knex('brick').insert([
    {
      author: 'Bryan',
      content: `ONE ${lorem}`,
      source_id: 1,
      concept_id: 1,
    },
    {
      author: 'Roger',
      content: `ONE bis ${lorem}`,
      source_id: 3,
      concept_id: 1,
    },
    {
      author: 'Bryan',
      content: `TWO ${lorem}`,
      source_id: 2,
      concept_id: 2,
    },
  ]);
}
