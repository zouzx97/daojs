import React from 'react';
import builtinComponents from '../../src/index';

const {
  Treemap,
} = builtinComponents;

const source = [
  {
    name: 'nodeA', value: 10, id: 1, parentId: 0,
  },
  {
    name: 'nodeB', value: 20, id: 2, parentId: 0,
  },
  {
    name: 'nodeA1', value: 10, id: 3, parentId: 1,
  },
  {
    name: 'nodeA2', value: 10, id: 4, parentId: 1,
  },
  {
    name: 'nodeA3', value: 10, id: 5, parentId: 1,
  },
  {
    name: 'nodeB1', value: 10, id: 6, parentId: 2,
  },
  {
    name: 'nodeB2', value: 10, id: 7, parentId: 2,
  },
  {
    name: 'nodeB3', value: 10, id: 8, parentId: 2,
  },
];

export default function TreemapDemo() {
  return (
    <Treemap source={source} />
  );
}
