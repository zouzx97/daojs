import React from 'react';
import builtinComponents from '../../src/index';

const {
  Scatter,
} = builtinComponents;

const scatterSource = [
  { Price: 23, Meat: 167, Vegetable: 8.3 },
  { Price: 81, Meat: 284, Vegetable: 12 },
  { Price: 91, Meat: 413, Vegetable: 4.1 },
  { Price: 13, Meat: 287, Vegetable: 13.5 },
];

export default function ScatterDemo() {
  return (
    <Scatter source={scatterSource} />
  );
}
