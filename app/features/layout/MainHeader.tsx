import React from 'react';
import routes from '../../constants/routes.json';
import { Link } from 'react-router-dom';
import styles from './Layout.css';

import { Layout, Button, Space, Row, Affix } from 'antd';
import { BankOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function MainHeader(): JSX.Element {
  return (
    <Affix>
      <Header className={styles['main-header']}>
        <Row
          style={{ paddingRight: '20px', paddingLeft: '20px', float: 'right' }}
        >
          <Space size="middle">
            <Link to={routes.SITE}>
              <Button>Single Site</Button>
            </Link>
            <Link to={routes.WORKER}>
              <Button>Single Worker</Button>
            </Link>
            <Link to={routes.NEWSITE}>
              <Button type="primary" icon={<BankOutlined />}>
                Nueva obra
              </Button>
            </Link>
            <Link to={routes.NEWWORKER}>
              <Button type="primary" icon={<UsergroupAddOutlined />}>
                Nuevo Trabajador
              </Button>
            </Link>
          </Space>
        </Row>
      </Header>
    </Affix>
  );
}
