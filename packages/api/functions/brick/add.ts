import knex from '@layers/database';
import { APIGatewayProxyWithCognitoAuthorizerEvent as Event } from 'aws-lambda';
import res from '../../response';

type Payload = {
  concept: string;
  content: string;
  source: string;
};
export const handler = async (event: Event) => {
  const payload: Payload = JSON.parse(event.body || '{}');

  // insert source
  let source = await knex('source')
    .where({ name: payload.source })
    .first('id')
    .then((object) => object.id || null);
  if (source == null) {
    source = await knex('source').insert({ name: payload.source }, ['id']);
    console.debug('CREATED', { source });
  }

  // insert concept
  let concept = await knex('concept')
    .where({ name: payload.concept })
    .first('id')
    .then((object) => object.id || null);
  if (concept == null) {
    concept = await knex('concept').insert({ name: payload.concept }, ['id']);
    console.debug('CREATED', { concept });
  }
  console.debug({ source, concept });
  const results = await knex('brick')
    .insert({
      concept_id: concept.id,
      source_id: source.id,
      content: payload.content,
    })
    .returning('id');
  return res.success(results);
};
