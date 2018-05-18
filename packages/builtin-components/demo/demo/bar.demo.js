import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme2 from '../assets/DaoTheme2.json';
import fakeData from './fakeData.demo';

echarts.registerTheme('theme2', daoTheme2);

const {
  Bar,
} = builtinComponents;

export default function BarDemo() {
  return (
    <div>
      <div> 柱状图 </div>
      <Bar
        source={fakeData.timeStampData}
        isHorizontal={false}
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />
      <div> 条形图 </div>
      <Bar
        source={fakeData.timeStampData}
        isHorizontal
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />
    </div>
  );
}
