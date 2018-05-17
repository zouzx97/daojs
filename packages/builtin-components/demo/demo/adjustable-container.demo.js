import React from 'react';
import builtinComponents from '../../src/index';
import fakeData from './fakeData.demo';

const {
  AdjustableContainer,
} = builtinComponents;


export default function AdjustableContainerDemo() {
  return (
    <AdjustableContainer layout={fakeData.layout}>
      <div key="1" style={{ background: '#4cb5f5' }} />
      <div key="2" style={{ background: '#20948b' }} />
      <div key="3" style={{ background: '#de7a22' }} />
      <div key="4" style={{ background: '#8a7a22' }} />
    </AdjustableContainer>
  );
}
