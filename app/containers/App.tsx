import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '../features/layout/Sidebar';
import MainHeader from '../features/layout/MainHeader';
import styles from '../features/layout/Layout.css';
import { useDispatch } from 'react-redux';
import { initializeSitesStore } from '../features/sites/siteSlice';
import { initializeWorkersStore } from '../features/workers/workerSlice';
import { initializeRelationsStore } from '../features/relations/relationshipSlice';

type Props = {
  children: ReactNode;
};

const { Content } = Layout;

export default function App(props: Props): JSX.Element {
  const { children } = props;

  // load initial store data
  const dispatch = useDispatch();
  dispatch(initializeSitesStore());
  dispatch(initializeWorkersStore());
  dispatch(initializeRelationsStore());

  return (
    <Layout
      className={styles.container}
      style={{ minHeight: '100vh' }}
      data-tid="container"
    >
      <Sidebar />
      <Layout className={styles['site-layout']} style={{ marginLeft: 200 }}>
        {/* <MainHeader /> */}
        {/* <Content style={{ margin: '0 16px' }}> */}
        <Content style={{ padding: '15px 30px' }}>
          <div
            className={styles['site-layout-background']}
            style={{ padding: 24 /*minHeight: '100vh'*/ }}
          >
            <>{children}</>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
