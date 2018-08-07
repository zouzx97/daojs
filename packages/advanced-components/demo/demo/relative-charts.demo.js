import React from 'react';
import { RelativeCharts } from '@daojs/advanced-components/src/index';
import data from './data.demo';

const charts = [
  { type: 'bar', metric: '销量', dimension: 'age' },
  { type: 'donut', metric: '销量', dimension: 'skuType' },
];
const source = data;
export default function relativeChartsDemo() {
  return (
    <div>
      <RelativeCharts charts={charts} source={source} />
    </div>
  );
}
