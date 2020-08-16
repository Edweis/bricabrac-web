// import AWSLambda from 'aws-lambda';

export default (event: any) => {
  return { statusCode: 200, body: JSON.stringify(event) };
};
