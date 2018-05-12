import React from 'react';
import builtinComponents from '../src/index';
import echarts from 'echarts';
import daoTheme1 from './assets/DaoTheme1.json';
import fakeData from './fakeData.demo';

echarts.registerTheme('theme1', daoTheme1);

const {
  Scatter,
} = builtinComponents;

const data = [
  ['Price', 'Meat', 'Vegetable'],
  [23, 167, 8.3],
  [81, 284, 12],
  [91, 413, 4.1],
  [13, 287, 13.5],
  [33, 167, 38.3],
  [51, 84, 112],
  [51, 13, 4.1],
  [13, 187, 213.5],
];

export default function ScatterDemo() {
  return (
    <Scatter source={data} />
  );
}
