import React from 'react';
import builtinComponents from '../../src/index';

const {
  Sankey,
} = builtinComponents;

const source = [
  {Source: 'a', Target: 'c', Value:5},
  {Source: 'a', Target: 'd', Value:3},
  {Source: 'a', Target: 'e', Value:3},
  {Source: 'b', Target: 'e', Value:8},
  {Source: 'e', Target: 'c', Value:1},
  {Source: 'e', Target: 'f', Value:2},
];
const sliceKey = [
  'Source', 'Target', 'Value',
]

export default function SankeyDemo() {
  return (
    <Sankey source={source} sliceKey={sliceKey} />
  );
}
