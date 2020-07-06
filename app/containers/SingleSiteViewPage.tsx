import React from 'react';
import SingleSiteView from '../features/sites/SingleSiteView';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function WorkerViewPage() {
  return (
    <>
      <PageHeaderMenu
        title="Nombre Empresa"
        subTitle="Información de la empresa"
      />
      <SingleSiteView />
    </>
  );
}
