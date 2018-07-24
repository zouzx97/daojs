import React from 'react';
import builtinComponents from '../../src/index';

const {
  DivergingStackedBar,
} = builtinComponents;

const source = [
  {Date: '2017-10-24', Negative: 20, Neutral: 30, Positive: 10},
  {Date: '2017-10-25', Negative: 40, Neutral: 35, Positive: 30},
  {Date: '2017-10-26', Negative: 33, Neutral: 38, Positive: 30},
  {Date: '2017-10-27', Negative: 40, Neutral: 40, Positive: 32},
];
const sliceKey = [
  'Date', 'Negative', 'Neutral', 'Positive',
];

export default function DivergingStackedBarDemo() {
  return (
    <DivergingStackedBar initSource={source} sliceKey={sliceKey} />
  );
}
