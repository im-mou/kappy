import React, { useState, useEffect } from 'react';
// import styles from './Worker.css';
import routes from '../../constants/routes.json';
import { useLocation } from 'react-router-dom';
import Lists from '../../components/Lists';
import { ISite, IWorker, IRelation } from '../../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { selectSites } from './siteSlice';
import { selectWorkers, findWorkersFromId } from '../workers/workerSlice';
import RelationsPanel from '../relations/RelationsPanel';
import {
  findRelationFromSiteId,
  selectRelationship,
} from '../relations/relationshipSlice';
// import {  } from "../workers/workerSlice";

import { Descriptions, Button, Space } from 'antd';

type Props = {
  obtainTitle?: any;
};

export default function SingleSiteView(props: Props): JSX.Element {
  // get data from worker store
  const dispatch = useDispatch();
  let workersStore: IWorker[] = useSelector(selectWorkers);
  const [workers, setWorkers] = useState([] as IWorker[]);
  const [relationsDrawerVisibility, setRelationsDrawerVisibility] = useState(
    false
  );

  const toggleVisibility = () => {
    setRelationsDrawerVisibility(!relationsDrawerVisibility);
  };

  // get the id from the path
  const path = useLocation().pathname.split('/');
  const urlSiteId = Number(path[path.length - 1]);

  // get site data from store
  const site: ISite = useSelector(selectSites).filter(
    (el) => el.id === urlSiteId
  )[0];

  props.obtainTitle(site.name);

  // componentDidMount
  useEffect(() => {
    dispatch(
      // find relations from store
      findRelationFromSiteId(urlSiteId, (relations: IRelation[]) => {
        dispatch(
          // find workers from thier id's
          findWorkersFromId(relations, (workers: IWorker[]) => {
            setWorkers(workers);
          })
        );
      })
    );
  }, [useSelector(selectRelationship)]); // sensibility list

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
          Añadir {workers.length > 0 ? 'o Eliminar' : null} Trabajadores
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
        site={site}
        inputWorkersIds={workers.map((w) => w.id)}
        visible={relationsDrawerVisibility}
        toggleVisibility={toggleVisibility}
      />
    </>
  );
}
