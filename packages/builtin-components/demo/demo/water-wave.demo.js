import React from 'react';
import builtinComponents from '../../src/index';

const {
  WaterWave,
} = builtinComponents;

export default function WaterWaveDemo() {
  return (
    <div style={{ textAlign: 'center' }}>
      <WaterWave
        height={161}
        title="补贴资金剩余"
        percent={34}
      />
    </div>
  );
}
