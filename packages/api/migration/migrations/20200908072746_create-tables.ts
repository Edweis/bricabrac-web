import * as Knex from 'knex';

// table.foreign('user_id').references('Items.user_id_in_items')
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('source', (table) => {
    table.increments();
    table.string('name');
  });
  await knex.schema.createTable('concept', (table) => {
    table.string('name').primary();
  });
  await knex.schema.createTable('bricks', (table) => {
    table.increments();
    table.string('name');
    table.string('author');
    table.text('content');

    table.integer('source_id');
    table.foreign('source_id').references('source.id');

    table.string('parent_concept_name');
    table.foreign('parent_concept_name').references('concept.name');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('brick').dropTable('concept').dropTable('source');
}
