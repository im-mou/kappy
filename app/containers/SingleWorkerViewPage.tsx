import React from 'react';
import SingleWorkerView from '../features/workers/SingleWorkerView';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function WorkerViewPage() {
  return (
    <>
      <PageHeaderMenu
        title="Nombre Trabajador"
        subTitle="Información del trabajador"
      />
      <SingleWorkerView />
    </>
  );
}
