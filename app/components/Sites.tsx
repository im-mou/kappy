import React from 'react';
import routes from '../constants/routes.json';
import Lists from './Lists';
import { ISite } from '../interfaces/interfaces';

const sites: Array<ISite> = [
  {
    _id: 1,
    name: 'Obra 1',
    startdate: '10/03/2010',
    information: 'Jefe de obra: 94847463',
    active: true,
  },
  {
    _id: 2,
    name: 'Obra 2',
    startdate: '06/11/2017',
    information: 'Encargado: 94843463',
    active: true,
  },
];

export default function Sites(): JSX.Element {
  return (
    <>
      <Lists
        items={sites}
        header={`Hay ${sites.length} obras`}
        linkPrefix={routes.SITE}
      />
    </>
  );
}
