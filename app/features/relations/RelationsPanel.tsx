import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWorkers } from '../workers/workerSlice';
import { createRelationship, removeRelationship } from './relationshipSlice';
import moment from 'moment';
import { Drawer, Button, Space, List } from 'antd';
import { IWorker, IRelation, ISite } from '../../interfaces/interfaces';
import styles from './Relations.css';

type Props = {
  site: ISite;
  visible: boolean;
  inputWorkersIds: number[];
  toggleVisibility: Function;
};

let selectedWorkersArray: Array<number> = [];

export default function RelationPanel({
  site,
  visible,
  inputWorkersIds,
  toggleVisibility,
}: Props): JSX.Element {
  const [selectedWorkers, setSelectedWorkers] = useState([]) as Array<any>;

  // get workers from store
  const workers = useSelector(selectWorkers);
  const dispatch = useDispatch();

  // selected existent workers
  const loadAlreadySelectedWorkers = (drawerVisible: Boolean) => {
    if (drawerVisible) {
      // update selected worker state array
      selectedWorkersArray = [...inputWorkersIds];
      setSelectedWorkers([...inputWorkersIds]);

      // iterate over items to add styling
      inputWorkersIds.map((workerId) => {
        let _DOMitemsWorker = document.getElementsByClassName(
          `listitem${workerId}`
        );
        if (_DOMitemsWorker.item(0) !== null)
          _DOMitemsWorker
            .item(0)!
            .classList.add(styles.selected, styles.preselected);
      });
    }
  };

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

    // update selected workers hook state array
    setSelectedWorkers(selectedWorkersArray);
  };

  const closeDrawer = () => {
    // reset selected array before closing
    setSelectedWorkers([]);
    toggleVisibility();
  };

  const saveSelection = () => {
    let itemsToInsert: IRelation[] = [];
    let itemsToRemove: IRelation[] = [];

    selectedWorkers.forEach((sw: number) => {
      if (!inputWorkersIds.includes(sw)) {
        // currently the start date will match the site startdate
        let startdate = `01/${site.startdate }`;
        itemsToInsert.push({ workerId: sw, siteId: site.id, startdate });
      }
    });

    inputWorkersIds.forEach((iw: number) => {
      if (!selectedWorkers.includes(iw)) {
        // currently the end date will be "Today date"
        let enddate = moment().format('DD/MM/YYYY')
        itemsToRemove.push({ workerId: iw, siteId: site.id, enddate });
      }
    });

    // save data to store
    if (itemsToInsert.length) dispatch(createRelationship(itemsToInsert));
    if (itemsToRemove.length) dispatch(removeRelationship(itemsToRemove));

    // wait for 500ms before closing
    setTimeout(() => {
      // reset selected array before closing
      setSelectedWorkers([]);
      toggleVisibility();
    }, 200);
  };

  const DrawerFooter = (): JSX.Element => {
    return (
      <Space style={{ margin: '10px 13px' }}>
        <Button type="primary" onClick={saveSelection}>
          Guardar
        </Button>
        <Button type="text" onClick={closeDrawer}>
          Cerrar sin guardar
        </Button>
      </Space>
    );
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
        afterVisibleChange={loadAlreadySelectedWorkers}
        footer={<DrawerFooter />}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        <List
          className={styles._listContainer}
          size="large"
          header="Selecciona las trabajadores a añadir"
          bordered
          dataSource={workers}
          style={{ backgroundColor: '#fff' }}
          renderItem={(item: IWorker) => (
            <List.Item
              className={`listitem${item.id}`}
              style={{ cursor: 'pointer' }}
              onClick={(e) => getitemId(e, item.id)}
            >
              {item.name}
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
}
