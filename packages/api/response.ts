import Httpnumber from 'http-status-codes';

type JSON = { [key: string]: any };
type Response = { statusCode: number; body: string; headers?: JSON };

const lambdaResponse = (json: JSON, statusCode: number) => {
  const response: Response = { statusCode, body: JSON.stringify(json) };
  response.headers = { 'Access-Control-Allow-Origin': '*' };
  return response;
};

export default {
  error: (json: JSON, statusCode: number = Httpnumber.BAD_REQUEST) =>
    lambdaResponse(json, statusCode),
  success: (json: JSON, statusCode: number = Httpnumber.OK) =>
    lambdaResponse(json, statusCode),
};
