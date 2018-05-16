import React from 'react';
import builtinComponents from '../../src/index';

const {
  Comp1,
} = builtinComponents;

export default function Comp1Demo() {
  return (
    <div style={{ width: '400px', height: '200px' }}>
      <Comp1 title="2562" subTitle="Total Sales today" percent={35} />
    </div>
  );
}
