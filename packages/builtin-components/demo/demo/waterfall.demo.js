import React from 'react';
import builtinComponents from '../../src/index';

const {
  Waterfall,
} = builtinComponents;

const source = [
  ['time', 'value'],
  ['1', 600],
  ['2', 305],
  ['3', 330],
  ['4', -108],
  ['5', -154],
  ['6', 135],
  ['7', 178],
  ['8', 286],
  ['9', -119],
  ['10', -361],
  ['11', -463],
];

export default function WaterfallDemo() {
  return (
    <Waterfall source={source} />
  );
}
