import React from 'react';
import builtinComponents from '../../src/index';

const {
  CircleTimeline,
} = builtinComponents;

const source = [
  { Year: '1900', North: 88, South: 98, East: 72, West: 38 },
  { Year: '1901', North: 79, South: 37, East: 98, West: 51 },
  { Year: '1902', North: 55, South: 83, East: 14, West: 51 },
  { Year: '1903', North: 66, South: 46, East:84, West: 99 },
  { Year: '1904', North: 62, South: 2, East: 83, West: 79 },
  { Year: '1905', North: 8, South: 84, East: 16, West: 21 },
  { Year: '1906', North: 34, South: 15, East: 70, West: 56 },
  { Year: '1907', North: 49, South: 94, East: 42, West: 80 },
  { Year: '1908', North: 36, South: 80, East: 25, West: 24 },
  { Year: '1909', North: 63, South: 76, East: 99, West: 76 },
  { Year: '1910', North: 82, South: 53, East: 73, West: 94 },
  { Year: '1911', North: 72, South: 34, East: 6, West: 15 },
  { Year: '1912', North: 85, South: 84, East: 7, West: 11 },
  { Year: '1913', North: 20, South: 12, East: 45, West: 45 },
  { Year: '1914', North: 19, South: 79, East: 36, West: 53 },
];
const sliceKey = [
  'Year', 'North', 'South', 'East', 'West',
];

export default function CircleTimelineDemo() {
  return (
    <CircleTimeline source={source} sliceKey={sliceKey} />
  );
}
