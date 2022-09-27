import { Col, Row } from 'antd';
import React from 'react';
import LayoutHeader from './LayoutHeader';
import LayoutMain from './LayoutMain';

const index = () => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <LayoutHeader />
        <LayoutMain />
      </Col>
    </Row>
  );
};

export default index;
