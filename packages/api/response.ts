import Httpnumber from 'http-status-codes';

type JSON = { [key: string]: string | number | Date | JSON } | JSON[];
type Response = {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
};

const lambdaResponse = (json: JSON, statusCode: number) => {
  const response: Response = { statusCode, body: JSON.stringify(json) };
  response.headers = { 'Access-Control-Allow-Origin': '*' };
  return response;
};

export default {
  error: (message: string, statusCode: number = Httpnumber.BAD_REQUEST) =>
    lambdaResponse({ message }, statusCode),
  success: <T extends JSON>(json: T, statusCode: number = Httpnumber.OK) =>
    lambdaResponse(json, statusCode),
};
