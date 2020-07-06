import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '../features/layout/Sidebar';
import MainHeader from '../features/layout/MainHeader';
import styles from '../features/layout/Layout.css';


type Props = {
  children: ReactNode;
};

const { Content } = Layout;

export default function App(props: Props): JSX.Element {
  const { children } = props;
  return (
    <Layout
      className={styles.container}
      style={{ minHeight: '100vh'}}
      data-tid="container"
    >
      <Sidebar />
      <Layout className={styles['site-layout']} style={{ marginLeft: 200 }}>
        <MainHeader />
        {/* <Content style={{ margin: '0 16px' }}> */}
        <Content style={{ padding: '0 50px' }}>
          <div
            className={styles['site-layout-background']}
            style={{ padding: 24, /*minHeight: '100vh'*/ }}
          >
            <>{children}</>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
