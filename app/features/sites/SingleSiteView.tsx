import React, { useState } from 'react';
// import styles from './Worker.css';
import routes from '../../constants/routes.json';
import { useLocation } from 'react-router-dom';
import Lists from '../../components/Lists';
import { ISite, IWorker } from '../../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectSites } from './siteSlice';
import RelationsPanel from '../relations/RelationsPanel';

import { Descriptions, Button, Space } from 'antd';

type Props = {
  obtainTitle?: any;
};

const workers: IWorker[] = [];

export default function SingleSiteView(props: Props): JSX.Element {
  const [relationsDrawerVisibility, setRelationsDrawerVisibility] = useState(
    false
  );

  const toggleVisibility = () => {
    setRelationsDrawerVisibility(!relationsDrawerVisibility);
  };

  // get the id from the path
  let path = useLocation().pathname.split('/');
  let urlSiteId = Number(path[path.length - 1]);

  // get site data from store
  const site: ISite = useSelector(selectSites).filter(
    (el) => el.id === urlSiteId
  )[0];

  // send title to the parent
  props.obtainTitle(site.name);

  return (
    <>
      <div className="section">
        <p className="section-header">Libro de assistencia de esta obra</p>
        <Button type="primary">Ver Assistencia</Button>

        <p className="section-header">Trabajadores en esta obra</p>
        <Lists items={workers} linkPrefix={routes.WORKER} />
        <Button
          type="default"
          style={{ marginTop: '20px' }}
          onClick={toggleVisibility}
        >
          Añadir Trabajadores
        </Button>

        <p className="section-header">Datos de la obra</p>
        <Descriptions bordered>
          <Descriptions.Item label="Fecha de inicio">
            {site.startdate}
          </Descriptions.Item>
          <Descriptions.Item label="Información extra">
            {site.information}
          </Descriptions.Item>
        </Descriptions>

        <p className="section-header">Opciones</p>
        <Space>
          <Button danger>Eliminar</Button>
          <Button>Editar</Button>
        </Space>
      </div>
      <RelationsPanel
        siteId={urlSiteId}
        visible={relationsDrawerVisibility}
        toggleVisibility={toggleVisibility}
      />
    </>
  );
}
