import knex from '@layers/database';
import { APIGatewayProxyWithCognitoAuthorizerEvent as Event } from 'aws-lambda';
import res from '../../response';

type Payload = {
  concept: string;
  content: string;
  source: string;
};
export const handler = async (event: Event) => {
  // console.debug(event);
  const payload: Payload = JSON.parse(event.body || '{}');
  const user = event.requestContext.identity.cognitoIdentityId;
  if (user == null) throw Error('user is null');
  const brickId = await knex.transaction(async (transaction) => {
    // get or create source
    let source = await transaction('source')
      .where({ name: payload.source })
      .first<{ id: number }>('id')
      .then((obj) => obj?.id);
    if (source == null) {
      source = await transaction('source')
        .insert({ name: payload.source })
        .returning<number[]>('id')
        .then((ids) => ids[0]);
    }

    // get or create concept
    let concept = await transaction('concept')
      .where({ name: payload.concept })
      .first<{ id: number }>('id')
      .then((obj) => obj?.id);
    if (concept == null) {
      concept = await transaction('concept')
        .insert({ name: payload.concept })
        .returning<number[]>('id')
        .then((ids) => ids[0]);
    }

    // get or create brick
    console.debug({ source, concept });
    return transaction('brick')
      .insert({
        concept_id: concept,
        source_id: source,
        content: payload.content,
        author: user,
      })
      .returning<number[]>('id')
      .then((ids) => ids[0]);
  });

  return res.success({ brickId });
};
