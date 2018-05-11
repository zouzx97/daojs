import React from 'react';
import builtinComponents from '@daojs/builtin-components';

const {
  Line,
} = builtinComponents;

export default function LineDemo() {
  return (
    <Line
      source={[
        {
          timestamp: '2018/1/1',
          value: 10,
        }, {
          timestamp: '2018/1/2',
          value: 20,
        },
      ]}
      // Axis dimension would be drawn as X axis.
      // Although line chart only supports 1 axis dimension,
      // we define the prop as array for better extensibility
      axisDimensions={['timestamp']}
      // Metric dimensions prop is optional.
      // If not specified, all dimensions except axis dimensions would be used.
      metricDimensions={['value']}
    />
  );
}
