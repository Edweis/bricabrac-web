import AWSLambda from 'aws-lambda';

export default (
  event: AWSLambda.CognitoUserPoolTriggerEvent,
  context: AWSLambda.Context,
) => {
  const updatedEvent = {
    ...event,
    response: {
      ...event.response,
      autoConfirmUser: true,
      autoVerifyEmail: true,
    },
  };
  context.done(undefined, updatedEvent);
};
