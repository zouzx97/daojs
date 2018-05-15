import React from 'react';
import builtinComponents from '../../src/index';

const {
  Scatter,
} = builtinComponents;


const scatterSource = [
  ['Price', 'Meat', 'Vegetable'],
  [23, 167, 8.3],
  [81, 284, 12],
  [91, 413, 4.1],
  [13, 287, 13.5],
];

export default function ScatterDemo() {
  return (
    <Scatter source={scatterSource} />
  );
}
