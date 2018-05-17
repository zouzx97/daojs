import React from 'react';
import { Col } from 'antd';
import builtinComponents from '../../src/index';

const {
  Select,
} = builtinComponents;


export default function SelectDemo() {
  return (
    <div>
      <Col span={8} />
      <Col span={8} >
        <Select
          label="granularity"
          enums={['Month', 'Week', 'Day']}
          defaultValue="Month"
        />
      </Col>
      <Col span={8} />
    </div>
  );
}
