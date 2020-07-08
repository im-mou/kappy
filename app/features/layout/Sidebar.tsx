import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import appconst from '../../constants/app.json';
import styles from './Layout.css';

import { Layout, Menu } from 'antd';
import {
  BankOutlined,
  TeamOutlined,
  SettingOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const { Sider, Footer } = Layout;

const footerStyle = {
  backgroundColor: 'transparent',
  color: 'rgba(255,255,255,0.3)',
  fontSize: '12px',
  paddingLeft: '25px',
};

export default function Sidebar(): JSX.Element {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className={styles.logo} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to={routes.HOME}>Inicio</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />}>
          <Link to={routes.SITES}>Obras</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to={routes.WORKERS}>Trabajadores</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          <Link to={routes.SETTINGS}>Ajustes</Link>
        </Menu.Item>
      </Menu>
      <Footer style={footerStyle}>{appconst.APPNAME} ©2020</Footer>
    </Sider>
  );
}
