import React from 'react';
import Home from '../components/Home';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function HomePage() {
  return (
    <>
      <PageHeaderMenu
        title="Attendance"
        subTitle="Pasa la lista de tus empleados"
        displayBack={false}
      />
      <Home />
    </>
  );
}
