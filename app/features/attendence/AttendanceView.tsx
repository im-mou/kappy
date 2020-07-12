import React, {useEffect, useState} from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { useSelector } from "react-redux";
import { getAttendance } from "../attendence/attendanceSlice";
import { selectSites } from "../sites/siteSlice";
import { EditableCell, EditableRow } from './EditableTableComponentes';
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
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import moment from 'moment';

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd item
    </Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

// export default class EditableTable extends React.Component {
  export default function EditableTable(): JSX.Element {

    const [dataSource, setDatasource] = useState([])

    // get site


    // get workers

    // get current date attendance


  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Nombre del Trabajador',
        dataIndex: 'name',
        width: '60%',
      },
      {
        title: 'Horas',
        dataIndex: 'hours',
        width: '10%',
        editable: true,
      },
      {
        title: 'Presente',
        dataIndex: 'present',
        width: '15%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Checkbox onClick={(v) => this.handleCheckbox(v, record.key)}>
              Present
            </Checkbox>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Mohsin Riaz',
          hours: '8',
        },
        {
          key: '1',
          name: 'Aamir mumtaz',
          hours: '8',
        },
      ],
      count: 2,
    };
  }

  handleCheckbox = (v, key) => {
    console.log(v);
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      hours: 32,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  handleDateChange = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <>
        <div>
          <Space>
            <Dropdown overlay={menu}>
              <Button>
                Nombre Empresa <DownOutlined />
              </Button>
            </Dropdown>
            <DatePicker
              onChange={this.onChangeDate}
              allowClear={false}
              locale={locale}
              showToday={true}
              format="DD/MMMM/YYYY"
              defaultValue={moment(+Date(), 'DD/MM/YYYY')}
            />
            <Button>Actualizar</Button>
          </Space>
        </div>

        <div style={{ margin: '20px 0px' }}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </div>
      </>
    );
  }
}
