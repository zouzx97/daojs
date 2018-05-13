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
        // default isHorizontal is false
        isHorizontal={false}
        // Axis dimension would be drawn as X axis.
        // Although line chart only supports 1 axis dimension,
        // we define the prop as array for better extensibility
        axisDimensions={['timestamp']}
        // Metric dimensions prop is optional.
        // If not specified, all dimensions except axis dimensions would be used.
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />
      <div> 条形图 </div>
      <Bar
        source={fakeData.timeStampData}
        isHorizontal
        // Axis dimension would be drawn as X axis.
        // Although line chart only supports 1 axis dimension,
        // we define the prop as array for better extensibility
        axisDimensions={['timestamp']}
        // Metric dimensions prop is optional.
        // If not specified, all dimensions except axis dimensions would be used.
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />
    </div>
  );
}
