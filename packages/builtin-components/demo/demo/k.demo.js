import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme1 from '../assets/DaoTheme1.json';

echarts.registerTheme('theme1', daoTheme1);

const {
  K,
} = builtinComponents;

const source = [
  { Date: '2017-10-24', open: 20, close: 30, lowest: 10, highest: 35 },
  { Date: '2017-10-25', open: 40, close: 35, lowest: 30, highest: 55 },
  { Date: '2017-10-26', open: 33, close: 38, lowest: 30, highest: 40 },
  { Date: '2017-10-27', open: 40, close: 40, lowest: 32, highest: 42 },
];

export default function KDemo() {
  return (
    <K source={source} />
  );
}
