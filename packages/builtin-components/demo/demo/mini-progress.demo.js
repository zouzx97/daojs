import React from 'react';
import builtinComponents from '../../src/index';

const {
  MiniProgress,
} = builtinComponents;

export default function MiniProgressDemo() {
  return (
    <MiniProgress percent={78} strokeWidth={8} target={80} />
  );
}
