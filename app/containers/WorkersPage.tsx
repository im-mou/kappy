import React from 'react';
import Workers from '../components/Workers';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function WorkersPage() {
  return (
    <>
      <PageHeaderMenu
        title="Trabajadores"
        subTitle="Listado de los trabajadores"
        displayBack={false}
      />
      <Workers />
    </>
  );
}
