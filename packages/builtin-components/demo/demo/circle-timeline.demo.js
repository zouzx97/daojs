import React from 'react';
import builtinComponents from '../../src/index';

const {
  CircleTimeline,
} = builtinComponents;

const source = [
  ['Year', 'North', 'South', 'East', 'West'],
  ['1900', 88, 98, 72, 38],
  ['1901', 79, 37, 98, 51],
  ['1902', 55, 83, 14, 51],
  ['1903', 66, 46, 84, 99],
  ['1904', 62, 2, 83, 79],
  ['1905', 8, 84, 16, 21],
  ['1906', 34, 15, 70, 56],
  ['1907', 49, 94, 42, 80],
  ['1908', 36, 80, 25, 24],
  ['1909', 63, 76, 88, 76],
  ['1910', 82, 53, 73, 94],
  ['1911', 72, 34, 6, 15],
  ['1912', 85, 84, 7, 11],
  ['1913', 20, 12, 45, 45],
  ['1914', 19, 79, 36, 53],
];

export default function CircleTimelineDemo() {
  return (
    <CircleTimeline source={source} />
  );
}
