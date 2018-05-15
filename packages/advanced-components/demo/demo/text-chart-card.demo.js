import React from 'react';
import advancedComponents from '../../src/index';
import composeAdvancedComponent from '@daojs/ui/src/compose-advanced-component';

const {
  TextChartCard,
} = advancedComponents;


export default function TextChartCardDemo() {
  const ReactTextChartCard = composeAdvancedComponent(TextChartCard);

  return (
    <ReactTextChartCard
      title="访问量"
      text="8,846"
      chartType="Line"
      chartData={[
        {
          x: '2018-05-15',
          y: 7,
        },
        {
          x: '2018-05-16',
          y: 5,
        },
        {
          x: '2018-05-17',
          y: 4,
        },
        {
          x: '2018-05-18',
          y: 2,
        },
        {
          x: '2018-05-19',
          y: 4,
        },
        {
          x: '2018-05-20',
          y: 7,
        },
        {
          x: '2018-05-21',
          y: 5,
        },
        {
          x: '2018-05-22',
          y: 6,
        },
        {
          x: '2018-05-23',
          y: 5,
        },
        {
          x: '2018-05-24',
          y: 9,
        },
        {
          x: '2018-05-25',
          y: 6,
        },
        {
          x: '2018-05-26',
          y: 3,
        },
        {
          x: '2018-05-27',
          y: 1,
        },
        {
          x: '2018-05-28',
          y: 5,
        },
        {
          x: '2018-05-29',
          y: 3,
        },
        {
          x: '2018-05-30',
          y: 6,
        },
        {
          x: '2018-05-31',
          y: 5,
        },
      ]}
    />
  );
}
