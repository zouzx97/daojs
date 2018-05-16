import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme1 from '../assets/DaoTheme1.json';

echarts.registerTheme('theme1', daoTheme1);

const {
  K,
} = builtinComponents;

const source = [
  ['Date', 'open', 'close', 'lowest', 'highest'],
  ['2017-10-24', 20, 30, 10, 35],
  ['2017-10-25', 40, 35, 30, 55],
  ['2017-10-26', 33, 38, 30, 40],
  ['2017-10-27', 40, 40, 32, 42],
];

export default function KDemo() {
  return (
    <K source={source} />
  );
}
