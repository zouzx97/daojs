import React from 'react';
import builtinComponents from '../../src/index';

const {
  CardContainer,
} = builtinComponents;

const renderItems = () => (<div>Hello</div>);
const renderExtras = () => (<div>This is extras part</div>);

export default function CardContainerDemo() {
  return (
    <CardContainer
      title="card-container"
      renderItems={renderItems}
      renderExtras={renderExtras}
      style={{
        height: '300px',
      }}
    />
  );
}
