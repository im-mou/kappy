import React from 'react';
// import styles from './Worker.css';
import { useLocation } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Lists from '../../components/Lists';
import { IWorker, ISite } from '../../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectWorkers } from './workerSlice';

import { Descriptions, Button, Space } from 'antd';

type Props = {
  obtainTitle?: any;
};



export default function SingleWorkerView(props: Props): JSX.Element {
  // get the id from the path
  let path = useLocation().pathname.split('/');
  let urlWorkerId = Number(path[path.length - 1]);

  // get site data from store
  const worker: IWorker = useSelector(selectWorkers).filter(
    (el) => el.id === urlWorkerId
  )[0];

  // send title to the parent
  props.obtainTitle(worker.name);

  return (
    <div className="section">
      <p className="section-header">Libro de Assistencia</p>
      <Button type="primary">Ver Assistencia</Button>

      <p className="section-header">Datos del trabajador</p>
      <Descriptions bordered>
        <Descriptions.Item span={2} label="Puesto de trabajo">
          {worker.workertype}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Fecha de inicio">
          {worker.startdate}
        </Descriptions.Item>
        <Descriptions.Item label="Información extra">
          {worker.information}
        </Descriptions.Item>
      </Descriptions>

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
