import React from 'react';
import builtinComponents from '../../src/index';

const {
  FlexBoxContainer,
} = builtinComponents;

const renderItems = () => (
  <React.Fragment>
    <div style={{ background: '#4cb5f5', flex: 1, height: '100%' }} />
    <div style={{ background: '#20948b', flex: 1, height: '100%' }} />
    <div style={{ background: '#de7a22', flex: 1, height: '100%' }} />
  </React.Fragment>
);

export default function FlexBoxContainerDemo() {
  return (
    <FlexBoxContainer
      renderItems={renderItems}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '300px',
      }}
    />
  );
}
