import React from 'react';
import { List } from 'antd';
import builtinComponents from '../../src/index';
import fakeData from './fakeData.demo';

const {
  BarList,
} = builtinComponents;

const data = [
  { title: '工专路 0 号店', count: 323 },
  { title: '工专路 1 号店', count: 500 },
  { title: '工专路 2 号店', count: 789 },
  { title: '工专路 3 号店', count: 652 },
  { title: '工专路 4 号店', count: 896 },
];

const renderItem = item => (
  <List.Item>
    <span style={{ marginRight: '30px' }}>{item.title}</span>
    <span>{item.count}</span>
  </List.Item>);

export default function BarListDemo() {
  return (
    <BarList
      bar={{
        source: fakeData.timeStampData,
        isHorizontal: false,
        axisDimensions: ['timestamp'],
        metricDimensions: ['value1', 'value2', 'value3', 'value4'],
      }}
      list={{
        source: data,
        renderItem,
      }}
    />
  );
}
