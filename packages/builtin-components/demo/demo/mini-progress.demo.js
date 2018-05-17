import React from 'react';
import builtinComponents from '../../src/index';
import { Row } from 'antd';

const {
  MiniProgress,
} = builtinComponents;

export default function MiniProgressDemo() {
  return (
    <div>
      <Row>
        <MiniProgress percent={78} strokeWidth={8} target={100} />
      </Row>
      <Row />
      <Row>
        <MiniProgress percent={8} strokeWidth={8} target={100} />
      </Row>
      <Row />
      <Row>
        <MiniProgress percent={38} strokeWidth={8} target={100} />
      </Row>
    </div>
  );
}
