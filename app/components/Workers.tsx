import React from 'react';
import routes from '../constants/routes.json';
import Lists from './Lists';
import { IWorker } from '../interfaces/interfaces';

const trabajadores: Array<IWorker> = [
  {
    id: 1,
    name: 'Mohsin Riaz',
    startdate: '27/02/2020',
    information: 'telefono: 94847463',
    workertype: 'Encargado',
  },
  {
    id: 2,
    name: 'Aamir mumtaz',
    startdate: '20/05/2320',
    information: 'telefono: 948252463',
    workertype: 'Encargado',
  },
];

export default function Workers(): JSX.Element {
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
