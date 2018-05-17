import React from 'react';
import builtinComponents from '../../src/index';
import { Col } from 'antd';

const {
  WaterWave,
} = builtinComponents;

export default function WaterWaveDemo() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Col span={8} />
      <Col span={8} >
        <WaterWave
          height={161}
          title="资金剩余"
          percent={34}
        />
      </Col>
      <Col span={8} />
    </div>
  );
}
