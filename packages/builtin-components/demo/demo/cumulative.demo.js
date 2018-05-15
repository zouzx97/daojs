import React from 'react';
import builtinComponents from '../../src/index';

const {
  Cumulative,
} = builtinComponents;


export default function CumulativeDemo() {
  return (
    <Cumulative
      axisDimensions={['timestamp']}
      metricDimensions={['value']}
      source={[{
          timestamp: '2018/1/1',
          value: 10,
      }, {
          timestamp: '2018/1/2',
          value: 20,
      }, {
          timestamp: '2018/1/3',
          value: 40,
      }, {
          timestamp: '2018/1/4',
          value: 80,
      }]}
    />
  );
}
