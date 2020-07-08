import React from 'react';
import { PageHeader, Row, Col } from 'antd';

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
  options?: JSX.Element;
};

export default function PageHeaderMenu({
  title,
  subTitle,
  displayBack,
  options,
}: Props) {
  return (
    <Row style={headerStyle} justify="space-around" align="middle">
      <Col span={18}>
        <PageHeader
          className="site-page-header"
          title={title}
          style={{padding:0}}
          backIcon={displayBack}
          subTitle={subTitle}
          onBack={() => window.history.back()}
        />
      </Col>
      <Col style={{ textAlign: 'right' }} span={6}>
        {options}
      </Col>
    </Row>
  );
}
