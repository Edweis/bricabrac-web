import React, { useState, useEffect } from 'react';
import { Concept, Brick } from '@packages/typings';
import cn from 'classnames';
import Head from 'next/head';
import ProtectRoute from '../../components/ProtectedRoute';

const conceptData: Concept[] = [
  { name: 'first concept', id: 1 },
  { name: 'second concept', id: 2 },
];
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const brickData: Brick[] = [
  { id: 1, conceptId: 1, content },
  { id: 2, conceptId: 1, content },
  { id: 3, conceptId: 2, content },
];
function Briques() {
  const [selection, setSelection] = useState<number>(conceptData[0].id);
  const [bricks, setBricks] = useState<Brick[]>([]);
  useEffect(() => {
    const newBricks = brickData.filter(
      (brick) => brick.conceptId === selection,
    );
    setBricks(newBricks);
  }, [selection]);
  return (
    <div>
      <Head>
        <title>Briques</title>
      </Head>
      <h1>Briques - Concepts</h1>
      <div className="row">
        <div className="col-4">
          <div className="list-group" id="list-tab" role="tablist">
            {conceptData.map((concept) => {
              const active = concept.id === selection;
              const mainStyle = 'list-group-item list-group-item-action';
              return (
                <button
                  className={cn(mainStyle, { active })}
                  key={concept.id}
                  type="button"
                  onClick={() => setSelection(concept.id)}
                >
                  {concept.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
            {bricks.map((brick) => (
              <div className="tab-pane active" key={brick.id}>
                {brick.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectRoute(Briques);
