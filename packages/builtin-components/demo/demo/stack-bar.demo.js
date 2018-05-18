import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme1 from '../assets/DaoTheme1.json';
import fakeData from './fakeData.demo';

echarts.registerTheme('theme1', daoTheme1);

const {
  StackBar,
} = builtinComponents;

export default function StackBarDemo() {
  return (
    <div>
      <div> Vertical Bar </div>
      <StackBar
        source={fakeData.timeStampData}
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3']}
        isHorizontal={false}
      />

      <div> Horizontal Bar </div>
      <StackBar
        source={fakeData.timeStampData}
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
        isHorizontal
      />

    </div>
  );
}
