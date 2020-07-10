import React from 'react';
import routes from '../constants/routes.json';
import Lists from './Lists';
import { useSelector } from 'react-redux';
import { selectWorkers } from '../features/workers/workerSlice';
import { IWorker } from '../interfaces/interfaces';

export default function Workers(): JSX.Element {
  // get data from store
  const trabajadores: Array<IWorker> = useSelector(selectWorkers);

  return (
    <>
      <Lists
        items={trabajadores}
        header={`Hay ${trabajadores.length} trabajadores`}
        linkPrefix={routes.WORKER}
      />
    </>
  );
}
