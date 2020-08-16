// import AWSLambda from 'aws-lambda';

export default async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
