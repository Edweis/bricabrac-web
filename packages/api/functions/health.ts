import { OK } from 'http-status-codes';

export const handler = async () => ({
  statusCode: OK,
  body: JSON.stringify({ status: 'OK' }),
});
