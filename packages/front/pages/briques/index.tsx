import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { Concept, Brick, Source } from '@packages/typings';
import cn from 'classnames';
import Head from 'next/head';
import { format } from 'timeago.js';
import ProtectRoute from '../../components/ProtectedRoute';
import api from '../../lib/api';

type Props = {
  bricks: Brick[];
  concepts: Concept[];
  sourceLookup: { [id: number]: Source };
};
function Briques(props: Props) {
  console.debug('render', props);
  const { bricks, concepts, sourceLookup } = props;
  const [selection, setSelection] = useState(concepts[0].id);
  const filteredBricks = bricks.filter(
    (brick) => brick.conceptId === selection,
  );
  // <span class="badge">14</span>
  return (
    <div>
      <Head>
        <title>Briques</title>
      </Head>
      <h1>Briques - Concepts</h1>
      <div className="row">
        <div className="col-4">
          <div className="list-group" id="list-tab" role="tablist">
            {concepts.map((concept) => {
              const count = bricks.filter(
                (brick) => brick.conceptId === concept.id,
              ).length;
              const active = concept.id === selection;
              const mainStyle =
                'list-group-item list-group-item-action btn-with-badge';
              return (
                <button
                  className={cn(mainStyle, { active })}
                  key={concept.id}
                  type="button"
                  onClick={() => setSelection(concept.id)}
                >
                  {concept.name}
                  <span className="badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
            {filteredBricks.map((brick) => (
              <div className="tab-pane active" key={brick.id}>
                <p>{brick.content}</p>
                <p className="brick-meta text-secondary text-right">
                  <span className="font-italic">
                    {sourceLookup[brick.sourceId].name}
                  </span>
                  {', '}
                  {format(brick.createdAt)}, by {brick.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectRoute(Briques);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const bricks = await api.get<Brick[]>('all/brick').then(({ data }) => data);
  const sources = await api
    .get<Concept[]>('all/source')
    .then(({ data }) => data);
  const concepts = await api
    .get<Source[]>('all/concept')
    .then(({ data }) => data);
  const sourceLookup = sources.reduce(
    (acc, value) => ({ ...acc, [value.id]: value }),
    {},
  );

  return { props: { bricks, sourceLookup, concepts } };
};
