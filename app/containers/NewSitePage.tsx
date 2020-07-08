import React from 'react';
import NewSite from '../features/sites/NewSite';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function NewSitePage() {
  return (
    <>
      <PageHeaderMenu title="Nueva Obra" subTitle="Crear nueva Obra" />
      <NewSite />
    </>
  );
}
