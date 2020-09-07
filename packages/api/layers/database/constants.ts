import dotenv from 'dotenv';

dotenv.config();
export const DATABASE_CONNECTION = {
  host: 'database.kapochamo.com',
  password: process.env.MAIN_DATABASE_PASSWORD,
  user: process.env.MAIN_DATABASE_USERNAME,
  database: 'postgres',
};
