import React from 'react';
import builtinComponents from '../src/index';
import echarts from 'echarts';
import daoTheme1 from './assets/DaoTheme1.json';
import fakeData from './fakeData.demo';

echarts.registerTheme('theme1', daoTheme1);

const {
  Line,
} = builtinComponents;

export default function ChinaMapDemo() {
  return (
    <Line
      source={fakeData.timeStampData}
      // Axis dimension would be drawn as X axis.
      // Although line chart only supports 1 axis dimension,
      // we define the prop as array for better extensibility
      axisDimensions={['timestamp']}
      // Metric dimensions prop is optional.
      // If not specified, all dimensions except axis dimensions would be used.
      metricDimensions={['value1', 'value2']}
    />
  );
}
