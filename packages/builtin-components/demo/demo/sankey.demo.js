import React from 'react';
import builtinComponents from '../../src/index';

const {
  Sankey,
} = builtinComponents;


const source = [
  ['Source', 'Target', 'Value'],
  ['a', 'c', 5],
  ['a', 'd', 3],
  ['a', 'e', 3],
  ['b', 'e', 8],
  ['e', 'c', 1],
  ['e', 'f', 2],
];

export default function SankeyDemo() {
  return (
    <Sankey source={source} />
  );
}
