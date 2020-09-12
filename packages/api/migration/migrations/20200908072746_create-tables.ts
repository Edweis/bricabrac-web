import * as Knex from 'knex';

// table.foreign('user_id').references('Items.user_id_in_items')
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('source', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.unique(['name']);
  });
  await knex.schema.createTable('concept', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.unique(['name']);
  });
  await knex.schema.createTable('brick', (table) => {
    table.increments();
    table.string('author').notNullable();
    table.text('content').notNullable();

    table.integer('source_id').notNullable();
    table.foreign('source_id').references('source.id');

    table.integer('concept_id').notNullable();
    table.foreign('concept_id').references('concept.id');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('brick').dropTable('concept').dropTable('source');
}
