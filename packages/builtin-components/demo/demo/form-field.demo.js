import React from 'react';
import builtinComponents from '../../src/index';

const {
  FormField,
} = builtinComponents;

export default function FormFieldDemo() {
  return (
    <FormField
      label="Form field"
      value="initial value"
    />
  );
}
