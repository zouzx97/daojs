import React from 'react';
import builtinComponents from '../../src/index';

const {
  Select,
} = builtinComponents;


export default function SelectDemo() {
  return (
    <Select
      label="granularity"
      enums={['Month', 'Week', 'Day']}
      defaultValue="Month"
    />
  );
}
