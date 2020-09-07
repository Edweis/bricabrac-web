import * as Knex from 'knex';

const password = process.env.MIGRATION_DATABASE_PASSWORD;
const user = process.env.MIGRATION_DATABASE_USERNAME;
export async function up(knex: Knex): Promise<void> {
  if (user == null || password == null) {
    throw Error('Password or user is not defined');
  }

  // await knex.raw(`CREATE DATABASE main`); // has to be run outside of a transaction
  const query = knex
    .raw('CREATE USER :user: WITH PASSWORD :password', {
      user,
      password,
    })
    .toString();
  await knex.raw(query);
}

export async function down(knex: Knex): Promise<void> {
  if (user == null) {
    throw Error('Password or user is not defined');
  }
  await knex.raw(`DROP USER :user:`, { user });
}
