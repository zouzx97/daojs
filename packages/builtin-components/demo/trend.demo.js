import React from 'react';
import builtinComponents from '../src/index';

const {
  Trend,
} = builtinComponents;

export default function LineDemo() {
  return (
    <div>
      <Trend flag="up">12%</Trend>
      <Trend flag="down" style={{ marginLeft: 8 }}>11%</Trend>
    </div>
  );
}
