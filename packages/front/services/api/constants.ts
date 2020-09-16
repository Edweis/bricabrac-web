export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-bbw.kapochamo.com/'
    : 'http://localhost:2727/stage/';

export const DEFAULT_HEADERS = {
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Credentials': true,
  // 'Access-Control-Allow-Headers': '*',
};
