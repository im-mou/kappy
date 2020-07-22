import React from 'react';
import NewWorker from '../features/workers/NewWorker';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function NewWorkerPage() {
  return (
    <>
      {/* <React.Suspense fallback={<h1>Loading...</h1>}> */}
        <PageHeaderMenu
          title="Nuevo trabajador"
          subTitle="Crear nuevo trabajador"
        />

        <NewWorker />
      {/* </React.Suspense> */}
    </>
  );
}
