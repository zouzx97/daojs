import React from 'react';
import builtinComponents from '../../src/index';

const {
  FlexBoxContainer,
} = builtinComponents;

const renderItems = () => (
  <React.Fragment>
    <span>This is item 1</span>
    <span>This is item 2</span>
  </React.Fragment>
);

export default function FlexBoxContainerDemo() {
  return (
    <FlexBoxContainer
      renderItems={renderItems}
      style={{
            'flex-direction': 'row',
            'justify-content': 'space-between',
        }}
    />
  );
}
