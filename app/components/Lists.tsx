import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import styles from './Lists.css';

type Props = {
  items: any
  header?: string;
  linkPrefix?: string;
};

const listItem = (item: any) : JSX.Element =>  {
  if (item.linkPrefix && item.linkPrefix !== '') {
    return (
      <Link to={item.linkPrefix + item.id}>
        <List.Item key={item.id} className={styles.listItem}>{item.name}</List.Item>
      </Link>
    );
  } else {
    return <List.Item key={item.id} className={styles.listItem}>{item.name}</List.Item>;
  }
};

export default function Lists({
  items,
  header,
  linkPrefix,
}: Props): JSX.Element {
  // add link prefix to each item, too lazy to do it properly
  if (linkPrefix) items = items.map((el : any) => ({ ...el, linkPrefix }));

  return (
    <List
      className={styles.listContainer}
      size="large"
      header={header ? <div className={styles.header}>{header}</div> : null}
      bordered
      dataSource={items}
      renderItem={listItem}
    />
  );
}
