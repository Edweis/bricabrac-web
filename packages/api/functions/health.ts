import { OK } from 'http-status-codes';
// import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async () => ({
  statusCode: OK,
  body: JSON.stringify({ status: 'OK' }),
});
