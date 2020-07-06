import React from 'react';
import Sites from '../components/Sites';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function SitesPage() {
  return (
    <>
      <PageHeaderMenu
        title="Obras"
        subTitle="Listado de tus obras"
        displayBack={false}
      />
      <Sites />
    </>
  );
}
