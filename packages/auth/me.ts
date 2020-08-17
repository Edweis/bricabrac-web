import { User } from '@packages/typings';
import AWSLambda from 'aws-lambda';

export default async (
  event: AWSLambda.APIGatewayProxyWithCognitoAuthorizerEvent,
) => {
  const userData = event.requestContext.authorizer.claims as User;
  return {
    statusCode: 200,
    body: JSON.stringify(userData),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
