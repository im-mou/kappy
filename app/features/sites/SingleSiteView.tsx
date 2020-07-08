import React from 'react';
// import styles from './Worker.css';
import routes from '../../constants/routes.json';
import Lists from '../../components/Lists';
import { ISite } from '../../interfaces/interfaces';

import { Descriptions, Button, Space } from 'antd';

const site: ISite = {
  id: 1,
  name: 'Obra 1',
  startdate: '10/03/2010',
  information: 'Jefe de obra: 94847463',
  active: true,
  workers: [
    {
      id: 1,
      name: 'Mohsin Riaz',
      startdate: '27/02/2020',
      information: 'telefono: 94847463',
      workertype: 'Encargado',
    },
    {
      id: 2,
      name: 'Aamir mumtaz',
      startdate: '20/05/2320',
      information: 'telefono: 948252463',
      workertype: 'Encargado',
    },
  ],
};

export default function SingleSiteView(): JSX.Element {
  return (
    <div className="section">
      <p className="section-header">Libro de Assistencia</p>
      <Button type="primary">Ver Assistencia</Button>

      <p className="section-header">Datos de la obra</p>
      <Descriptions bordered>
        <Descriptions.Item label="Fecha de inicio">
          {site.startdate}
        </Descriptions.Item>
        <Descriptions.Item label="Información extra">
          {site.information}
        </Descriptions.Item>
      </Descriptions>

      <p className="section-header">Trabajadores en esta obra</p>
      <Lists items={site.workers} linkPrefix={routes.WORKER}/>

      <p className="section-header">Opciones</p>
      <Space>
        <Button type="dashed">Editar</Button>
        <Button type="dashed" danger>
          Eliminar
        </Button>
      </Space>
    </div>
  );
}
