import * as Knex from 'knex';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
export async function seed(knex: Knex): Promise<void> {
  await knex('brick').del();
  await knex('concept').del();
  await knex('source').del();

  const concepts = await knex('concept')
    .insert([
      { name: 'concept one' },
      { name: 'concept two' },
      { name: 'concept three' },
    ])
    .returning('id');
  const sources = await knex('source')
    .insert([
      { name: 'source one' },
      { name: 'source two' },
      { name: 'source three' },
    ])
    .returning('id');

  console.debug({ sources, concepts });
  await knex('brick').insert([
    {
      author: 'Bryan',
      content: `ONE ${lorem}`,
      source_id: sources[0],
      concept_id: concepts[0],
    },
    {
      author: 'Roger',
      content: `ONE bis ${lorem}`,
      source_id: sources[2],
      concept_id: concepts[0],
    },
    {
      author: 'Bryan',
      content: `TWO ${lorem}`,
      source_id: sources[2],
      concept_id: concepts[1],
    },
  ]);
}
