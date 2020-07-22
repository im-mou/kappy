import React from 'react';
import NewSite from '../features/sites/NewSite';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function NewSitePage() {
  return (
    <>
      {/* <React.Suspense fallback={<h1>Loading...</h1>}> */}
        <PageHeaderMenu title="Nueva Obra" subTitle="Crear nueva Obra" />
        <NewSite />
      {/* </React.Suspense> */}
    </>
  );
}
