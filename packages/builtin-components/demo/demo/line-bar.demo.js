import React from 'react';
import echarts from 'echarts';
import builtinComponents from '../../src/index';
import daoTheme1 from '../assets/DaoTheme1.json';

echarts.registerTheme('theme1', daoTheme1);

const {
  LineBarChart,
} = builtinComponents;

const data = [{
  ape: '0.088995623',
  mape: '',
  target: 8.93,
  forecast: 8.14,
  month: 'Apr',
  year: '17',
  timestamp: '2017-04-01T07:00:00.000Z',
  targetGap: 8.93,
  forecastGap: 8.14,
},
{
  ape: '0.37722284',
  mape: '',
  target: 6.65,
  forecast: 4.14,
  month: 'May',
  year: '17',
  timestamp: '2017-05-01T07:00:00.000Z',
  targetGap: 15.58,
  forecastGap: 12.280000000000001,
},
{
  ape: '0.33381479',
  mape: '',
  target: 9.84,
  forecast: 6.56,
  month: 'Jun',
  year: '17',
  timestamp: '2017-06-01T07:00:00.000Z',
  targetGap: 25.42,
  forecastGap: 18.84,
},
{
  ape: '0.099190216',
  mape: '',
  target: 12.43,
  forecast: 11.19,
  month: 'Jul',
  year: '17',
  timestamp: '2017-07-01T07:00:00.000Z',
  targetGap: 37.85,
  forecastGap: 30.03,
},
{
  ape: '0.051954735',
  mape: '',
  target: 12.72,
  forecast: 12.06,
  month: 'Aug',
  year: '17',
  timestamp: '2017-08-01T07:00:00.000Z',
  targetGap: 50.57,
  forecastGap: 42.09,
},
{
  ape: '0.026676005',
  mape: '',
  target: 9.06,
  forecast: 9.3,
  month: 'Sep',
  year: '17',
  timestamp: '2017-09-01T07:00:00.000Z',
  targetGap: 59.63,
  forecastGap: 51.39,
},
{
  ape: '0.04549428',
  mape: '',
  target: 5.83,
  forecast: 6.09,
  month: 'Oct',
  year: '17',
  timestamp: '2017-10-01T07:00:00.000Z',
  targetGap: 65.46000000000001,
  forecastGap: 57.480000000000004,
},
{
  ape: '0.127100012',
  mape: '',
  target: 4.28,
  forecast: 3.73,
  month: 'Nov',
  year: '17',
  timestamp: '2017-11-01T07:00:00.000Z',
  targetGap: 69.74000000000001,
  forecastGap: 61.21,
},
{
  ape: '0.012046435',
  mape: '0.099265509',
  target: 2.63,
  forecast: 2.6,
  month: 'Dec',
  year: '17',
  timestamp: '2017-12-01T08:00:00.000Z',
  targetGap: 72.37,
  forecastGap: 63.81,
}];

export default function LineBarDemo() {
  return (
    <LineBarChart value={
      {
        xAxisMetric: 'month',
        yAxisMetrics: [{
            metrics: [
              'target',
              'forecast',
            ],
            type: 'bar',
            name: '销售额(亿元)',
          },
          {
            metrics: [
              'targetGap',
              'forecastGap',
            ],
            type: 'line',
            name: '累计销售额(亿元)',
          },
        ],
        source: data,
        metricDimensions: [
          'target',
          'forecast',
          'targetGap',
          'forecastGap',
        ],
        key2Name: {
          target: '目标销售额',
          forecast: '预测销售额',
          targetGap: '累计目标销售额',
          forecastGap: '累计预测销售额',
        },
      }
    }
    />
  );
}
