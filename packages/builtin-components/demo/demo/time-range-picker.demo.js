import React from 'react';
import builtinComponents from '../../src/index';

const {
  TimeRange,
} = builtinComponents;

export default function TimeRangePickekDemo() {
  return (
    <TimeRange
      start="2018-03-01"
      end="2018-04-01"
      label="time range"
      update={() => {}}
    />
  );
}
