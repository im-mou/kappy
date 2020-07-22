import React from 'react';
import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Workers from '../components/Workers';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

const newWorkerButton: JSX.Element = (
  <Link to={routes.NEWWORKER}>
    <Button icon={<UserAddOutlined />} type="primary">
      Nuevo Trabajador
    </Button>
  </Link>
);

export default function WorkersPage() {
  return (
    <>
      {/* <React.Suspense fallback={<h1>Loading...</h1>}> */}
        <PageHeaderMenu
          title="Trabajadores"
          subTitle="Listado de los trabajadores"
          displayBack={false}
          options={newWorkerButton}
        />
        <Workers />
      {/* </React.Suspense> */}
    </>
  );
}
