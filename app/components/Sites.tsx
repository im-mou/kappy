import React from 'react';
import routes from '../constants/routes.json';
import Lists from './Lists';
import { ISite } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectSites } from '../features/sites/siteSlice';

export default function Sites(): JSX.Element {

  // get data from the store
  const sites: Array<ISite> = useSelector(selectSites);

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
