import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWorkers } from '../workers/workerSlice';
import { selectRelationship, createNewRelationship } from './relationshipSlice';
import { Drawer, Button, Space, List } from 'antd';
import { IWorker, IRelation } from '../../interfaces/interfaces';
import styles from './Relations.css';

type Props = {
  siteId: number;
  visible: boolean;
  toggleVisibility: Function;
};

let selectedWorkersArray: Array<number> = [];

export default function RelationPanel({
  siteId,
  visible,
  toggleVisibility,
}: Props): JSX.Element {
  const [selectedWorkers, setSelectedWorkers] = useState([]) as Array<any>;

  // get workers from store
  const workers = useSelector(selectWorkers);
  const dispatch = useDispatch();

  const getitemId = (event: any, workerId: number) => {
    // check if it's already selected
    let elementIndex = selectedWorkers.findIndex(
      (el: number) => el === workerId
    );

    // append or remove item from array
    if (elementIndex < 0) {
      // append
      selectedWorkersArray = [workerId, ...selectedWorkers];
      event.target.classList.add(styles.selected);
    } else {
      // remove
      selectedWorkersArray = selectedWorkersArray.filter(
        (el) => el !== workerId
      );
      event.target.classList.remove(styles.selected);
    }

    // update array
    setSelectedWorkers(selectedWorkersArray);
  };

  const closeDrawer = () => {
    // reset selected array before closing
    setSelectedWorkers([]);
    toggleVisibility();
  };

  const saveSelection = () => {
    // save data to store
    dispatch(
      selectedWorkersArray.map((wid) =>
        createNewRelationship({ workerId: wid, siteId })
      )
    );

    // wait for 500ms before closing
    setTimeout(() => {
      // reset selected array before closing
      setSelectedWorkers([]);
      toggleVisibility();
    }, 500);
  };

  return (
    <>
      <Drawer
        title="Añadir trabajadores a esta obra"
        placement="right"
        closable={true}
        maskClosable={false}
        onClose={() => toggleVisibility()}
        visible={visible}
        key="right"
        width={400}
        destroyOnClose={true}
      >
        <List
          size="large"
          header="Selecciona las trabajadores a añadir"
          bordered
          dataSource={workers}
          renderItem={(item: IWorker) => (
            <List.Item
              className={`listitem${item.id}`}
              style={{ cursor: 'pointer' }}
              onClick={(e) => getitemId(e, item.id)}
            >
              {item.id}
            </List.Item>
          )}
        />

        <Space style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={saveSelection}>
            Guardar
          </Button>
          <Button type="text" onClick={closeDrawer}>
            Cerrar sin guardar
          </Button>
        </Space>
      </Drawer>
    </>
  );
}
