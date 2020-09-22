import knex from 'knex';
import sqlParser from 'sql-formatter';
import chalk from 'chalk';
import { DATABASE_CONNECTION, isDev } from './constants';

const instance = knex(DATABASE_CONNECTION);
if (isDev) {
  instance.on('query', ({ sql, bindings }) => {
    if (sql == null) return;
    const params = bindings?.map((value: string) => `'${value}'`);
    const formated = sqlParser.format(sql, { params });
    console.log(chalk.underline('PostgreSQL request'));
    console.log(chalk.cyanBright(formated));
  });
}
export default instance;
