import React from 'react';
import builtinComponents from '../../src/index';
import fakeData from './fakeData.demo';

const {
  LineWithDataZoom,
} = builtinComponents;


export default function LineWithDataZoomDemo() {
  return (
    <LineWithDataZoom
      source={fakeData.timeStampData}
      axisDimensions={['timestamp']}
      metricDimensions={['value1', 'value2', 'value3', 'value4']}
    />
  );
}
