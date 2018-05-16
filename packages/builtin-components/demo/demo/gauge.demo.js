import React from 'react';
import builtinComponents from '../../src/index';

const {
  Gauge,
} = builtinComponents;

export default function GaugeDemo() {
  return (
    <Gauge
      title="核销率"
      height={164}
      percent={87}
    />
  );
}
