import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import cn from 'classnames';
import { Concept, Brick, Source } from '@packages/typings';
import Head from 'next/head';
import { orderBy } from 'lodash';
import * as yup from 'yup';
import ProtectRoute from '../../components/ProtectedRoute';
import api from '../../services/api';

type FormData = {
  concept: string;
  content: string;
  source: string;
};
const validationSchema = yup.object().shape({
  concept: yup.string().required(),
  content: yup.string().required(),
  source: yup.string().required(),
});
type Props = {
  concepts: Concept[];
  sources: Source[];
};
function Briques(props: Props) {
  const { concepts, sources } = props;
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await api.post('/brick/add', data).catch(console.error);
    setLoading(false);
  });
  return (
    <div>
      <Head>
        <title>Briques Creation</title>
      </Head>
      <h1>Briques - Creation</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Concept</label>
          <input
            name="concept"
            className={cn('form-control', { 'is-invalid': errors.concept })}
            placeholder="Truth"
            ref={register}
          />
          <div className="invalid-feedback">{errors.concept?.message}</div>
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            className={cn('form-control', { 'is-invalid': errors.content })}
            placeholder="Here is what I learnt ..."
            ref={register}
          />
          <div className="invalid-feedback">{errors.content?.message}</div>
        </div>
        <div className="form-group">
          <label>Source</label>
          <input
            name="source"
            className={cn('form-control', { 'is-invalid': errors.source })}
            placeholder="Les Misérables, Victor Hugo"
            ref={register}
          />
          <div className="invalid-feedback">{errors.source?.message}</div>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-lg btn-primary">
            {loading ? (
              <span
                className="spinner-border"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Add brick'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProtectRoute(Briques);

export const getStaticProps: GetStaticProps<Props> = async () => {
  type Popularity = { [id: number]: number };
  const bricks = await api.get<Brick[]>('all/brick').then(({ data }) => data);
  const sourcesRaw = await api
    .get<Concept[]>('all/source')
    .then(({ data }) => data);
  const conceptsRaw = await api
    .get<Source[]>('all/concept')
    .then(({ data }) => data);

  const sourcePopularity = bricks.reduce(
    (acc, brick) => ({
      ...acc,
      [brick.sourceId]: acc[brick.sourceId] || 0 + 1,
    }),
    {} as Popularity,
  );

  const conceptPopularity = bricks.reduce(
    (acc, brick) => ({
      ...acc,
      [brick.conceptId]: acc[brick.conceptId] || 0 + 1,
    }),
    {} as Popularity,
  );

  const sources = orderBy(
    sourcesRaw,
    [(source) => sourcePopularity[source.id], 'name'],
    ['desc', 'asc'],
  );
  const concepts = orderBy(
    conceptsRaw,
    [(concept) => conceptPopularity[concept.id], 'name'],
    ['desc', 'asc'],
  );

  return { props: { bricks, sources, concepts } };
};
