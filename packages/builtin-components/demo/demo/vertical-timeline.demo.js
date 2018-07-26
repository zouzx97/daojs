import React from 'react';
import builtinComponents from '../../src/index';

const {
  VerticalTimeline,
} = builtinComponents;

const source = [
  { date: '2/1', value: -6.5 },
  { date: '2/2', value: -0.7 },
  { date: '2/3', value: 2.3 },
  { date: '2/4', value: 3.5 },
  { date: '2/5', value: 2.1 },
  { date: '2/6', value: 0.5 },
  { date: '2/7', value: 0 },
  { date: '2/8', value: 2 },
  { date: '2/9', value: 8 },
];

export default function VerticalTimelineDemo() {
  return (
    <VerticalTimeline source={source} />
  );
}
