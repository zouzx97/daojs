import React from 'react';
import builtinComponents from '../../src/index';

const {
  RadioGroup,
} = builtinComponents;


export default function RadioGroupDemo() {
  return (
    <RadioGroup
      label="granularity"
      enums={['Month', 'Week', 'Day']}
      defaultValue="Month"
    />
  );
}
