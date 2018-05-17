import React from 'react';
import builtinComponents from '../../src/index';

const {
  MiniTable,
} = builtinComponents;

export default function MiniTableDemo() {
  return (
    <div style={{ width: '300px', background: '#8BC44A' }}>
      <MiniTable data={[
        ['Free Space', '132 Gb'],
        ['Used Space', '1.45 Gb'],
      ]}
      />
    </div>

  );
}
