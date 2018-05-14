import React from 'react';
import builtinComponents from '../../src/index';

const {
  AdjustableContainer,
} = builtinComponents;


export default function AdjustableContainerDemo() {
  return (
    <AdjustableContainer
      layout={[
        {
          i: '1', w: 3, h: 3, x: 0, y: 0,
        },
        {
          i: '2', w: 3, h: 3, x: 3, y: 0,
        },
        {
          i: '3', w: 3, h: 3, x: 6, y: 0,
        },
      ]}
    >
      <div key="1" style={{ background: '#4cb5f5' }} />
      <div key="2" style={{ background: '#20948b' }} />
      <div key="3" style={{ background: '#de7a22' }} />
    </AdjustableContainer>
  );
}
