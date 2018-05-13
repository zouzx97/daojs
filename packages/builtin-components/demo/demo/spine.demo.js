import React from 'react';
import builtinComponents from '../../src/index';

const {
  Spine,
} = builtinComponents;


const source = [
  ['Date', 'Income', 'Outcome'],
  ['周一', 100, -50],
  ['周二', 200, -180],
  ['周三', 190, -89],
  ['周四', 700, -605],
  ['周五', 900, -590],
  ['周六', 300, -200],
  ['周日', 290, -100],
];

export default function SpineDemo() {
  return (
    <Spine source={source} />
  );
}
