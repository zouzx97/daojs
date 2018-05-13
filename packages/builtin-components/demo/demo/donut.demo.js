import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme1 from '../assets/DaoTheme1.json';

echarts.registerTheme('theme1', daoTheme1);

const {
  Donut,
} = builtinComponents;

const data = [{
  season: 'spring',
  value: 10,
}, {
  season: 'summer',
  value: 20,
}, {
  season: 'autumn',
  value: 40,
}, {
  season: 'winter',
  value: 80,
}];

export default function DonutDemo() {
  return (
    <Donut
      title="Donut"
      subTitle=""
      source={data}
    />
  );
}
