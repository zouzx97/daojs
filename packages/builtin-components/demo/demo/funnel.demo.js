import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme1 from '../assets/DaoTheme1.json';

echarts.registerTheme('theme1', daoTheme1);

const {
  Funnel,
} = builtinComponents;

const data = [
  { name: '访问', value: 60 },
  { name: '咨询', value: 40 },
  { name: '订单', value: 20 },
  { name: '点击', value: 80 },
  { name: '展现', value: 110 },
];
const sliceKey = [
  'name', 'value',
];

export default function FunnelDemo() {
  return (
    <Funnel source={data} sliceKey={sliceKey} />
  );
}
