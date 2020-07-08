import React from 'react';
import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FolderAddFilled } from '@ant-design/icons';
import Sites from '../components/Sites';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

const newSite: JSX.Element = (
  <Link to={routes.NEWSITE}>
    <Button icon={<FolderAddFilled />} type="primary">
      Nueva Obra
    </Button>
  </Link>
);

export default function SitesPage() {
  return (
    <>
      <PageHeaderMenu
        title="Obras"
        subTitle="Listado de tus obras"
        displayBack={false}
        options={newSite}
      />
      <Sites />
    </>
  );
}
