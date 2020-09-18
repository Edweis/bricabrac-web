import knex from '@layers/database';
import { APIGatewayEvent } from 'aws-lambda';
import res from '../response';

const SUPPORTED_TABLES = ['source', 'brick', 'concept'];
export const handler = async (event: APIGatewayEvent) => {
  const table = event?.pathParameters?.table;
  if (!table || !SUPPORTED_TABLES.includes(table)) {
    return res.error('Unsupported table');
  }

  const results = await knex(table).select();
  return res.success(results);
};
