import React from 'react';
import builtinComponents from '../../src/index';

const {
  FormInput,
} = builtinComponents;

export default function FormInputDemo() {
  return (
    <FormInput
      label="Form field"
      value="initial value"
      update={() => {}}
    />
  );
}

