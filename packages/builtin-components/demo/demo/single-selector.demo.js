import React from 'react';
import builtinComponents from '../../src/index';

const {
  SingleSelector,
} = builtinComponents;

export default function SingleSelectorDemo() {
  return (
    <div>
      <SingleSelector
        label="single selector shown as radio group"
        enums={['Month', 'Week', 'Day']}
        defaultValue="Month"
        update={() => {}}
      />
      <SingleSelector
        label="single selector shown as select"
        enums={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
        defaultValue="Monday"
        update={() => {}}
      />
    </div>
  );
}
