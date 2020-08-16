import { OK } from 'http-status-codes';

export default async () => ({
  statusCode: OK,
  body: JSON.stringify({ status: 'OK' }),
});
