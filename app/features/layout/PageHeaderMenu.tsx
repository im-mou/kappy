import React from 'react';
import { PageHeader } from 'antd';

const headerStyle = {
  marginBottom: '40px',
  padding: '0',
  paddingBottom: '20px',
  borderBottom: '1px solid rgb(235, 237, 240)',
};

type Props = {
  title: string;
  subTitle: string;
  displayBack?: boolean;
};

export default function PageHeaderMenu({ title, subTitle, displayBack }: Props) {
  return (
    <PageHeader
      className="site-page-header"
      style={headerStyle}
      title={title}
      backIcon={displayBack}
      subTitle={subTitle}
      onBack={() => window.history.back()}
    />
  );
}
