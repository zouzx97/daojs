import React from 'react';
import { Col } from 'antd';
import builtinComponents from '../../src/index';

const {
  SingleSelector,
} = builtinComponents;

export default function SingleSelectorDemo() {
  return (
    <div>
      <Col span={8} />
      <Col span={8} >
        <SingleSelector
          label="Radio Group"
          enums={['Month', 'Week', 'Day']}
          defaultValue="Month"
          update={() => {}}
        />
        <SingleSelector
          label="下拉菜单"
          enums={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
          defaultValue="Monday"
          update={() => {}}
        />
      </Col>
      <Col span={8} />
    </div>
  );
}
