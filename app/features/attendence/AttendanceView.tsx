import React, { useEffect, useState } from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { useSelector, useDispatch } from 'react-redux';
import { getAttendance } from '../attendence/attendanceSlice';
import { selectSites } from '../sites/siteSlice';
import { selectWorkers, findWorkersFromId } from '../workers/workerSlice';
import {
  findRelationFromSiteId,
  selectRelationship,
} from '../relations/relationshipSlice';
import { EditableCell, EditableRow } from './EditableTableComponentes';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { IWorker, ISite, IRelation } from '../../interfaces/interfaces';
import moment, { Moment } from 'moment';
import {
  Table,
  Button,
  Popconfirm,
  Checkbox,
  DatePicker,
  Dropdown,
  Menu,
  Space,
} from 'antd';

export default function EditableTable(): JSX.Element {
  const dispatch = useDispatch();
  let siteStore: ISite[] = useSelector(selectSites);
  let relationsStore: IRelation[] = useSelector(selectRelationship);
  let workersStore: IWorker[] = useSelector(selectWorkers);

  let workersIds: number[] = relationsStore
    .filter((relation: IRelation) => relation.siteId === siteStore[0].id)
    .map((r: IRelation) => r.workerId);

  let workers: IWorker[] = workersStore.filter(
    (worker: IWorker) => workersIds.indexOf(worker.id) > -1
  );

  console.log('siteStore', siteStore);

  // console.log(
  //   'home',
  //   workersIds
  //   // .filter((r: IRelation) => r.siteId === siteStore[0].id)
  //   // .forEach((el: IRelation) => {
  //   //   return workersStore.filter((w: IWorker) => el.workerId === w.id)
  //   // })
  // );

  // hook's state
  // set initial states
  const [currSite, setCurrSite] = useState(siteStore[0]);
  const [dataSource, setDataSource] = useState(workers);
  const [currDate, setCurrDate] = useState(
    moment(new Date(), 'DD/MM/YYYY') as moment.Moment
  );

  /* TODO:
    - Replace callbacks to promises and remove dispatch calls
  // */
  // const getWorkersFromSideId = (siteId: number) => {
  //   dispatch(
  //     findRelationFromSiteId(siteId, (relations: IRelation[]) => {
  //       dispatch(
  //         findWorkersFromId(relations, (workers: IWorker[]) => {
  //           setDataSource(workers);
  //         })
  //       );
  //     })
  //   );
  // };

  // define table columns
  const columns = [
    {
      title: 'Nombre del Trabajador',
      dataIndex: 'name',
      width: '60%',
    },
    {
      title: 'Horas',
      value: 8,
      dataIndex: 'hours',
      width: '10%',
      editable: true,
    },
    {
      title: 'Presente',
      dataIndex: 'present',
      width: '15%',
      render: (text: string, record: any) =>
        dataSource.length >= 1 ? (
          <Checkbox
            checked={true}
            // onClick={(e) => handleCheckbox(e, record.id)}
          >
            Present
          </Checkbox>
        ) : null,
    },
  ];

  // componentDidMount
  // getWorkersFromSideId(currSite.id);
  // useEffect(() => {
  //   // get workers from the first element in the site array
  //   console.log('attendance: relations', relationsStore);
  //   // getWorkersFromSideId(currSite.id);
  // }, []);

  const handleCheckbox = (v: any, key: number) => {
    // console.log(v);
    // const ds = [...dataSource];
    // setDataSource([...dataSource].filter((item: IWorker) => item.id !== key));
  };

  const handleSave = (row: any) => {
    // const newData = [...dataSource];
    // const index = newData.findIndex((item) => row.key === item.id);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    // setDataSource(newData);
  };

  const onChangeDate = (date: any, dateString: any) => {
    // console.log(date, dateString);
  };

  const handleDateChange = (e: any) => {
    // console.log('click left button', e);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const _columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const menu = (items: ISite[]) => {
    return (
      <Menu style={{ textTransform: 'capitalize' }} onClick={handleMenuClick}>
        {items.map((site: ISite, index: number) => (
          <Menu.Item data-site={site} key={index}>
            {site.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  function handleMenuClick(e: any) {
    // update current site state
    const site = e.item.props['data-site'];
    setCurrSite(site);
  }

  // empty state
  if (!siteStore.length || !relationsStore.length || !workers.length)
    return <div>loading...</div>;

  return (
    <React.Fragment>
      <div>
        <Space>
          <Dropdown overlay={menu(siteStore)}>
            <Button>
              {currSite?.name || 'Loading...'} <DownOutlined />
            </Button>
          </Dropdown>
          <DatePicker
            onChange={onChangeDate}
            allowClear={false}
            locale={locale}
            showToday={true}
            format="DD/MMMM/YYYY"
            value={currDate}
          />
        </Space>
      </div>

      <div style={{ margin: '20px 0px' }}>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={_columns}
          pagination={false}
        />
      </div>
    </React.Fragment>
  );
}
