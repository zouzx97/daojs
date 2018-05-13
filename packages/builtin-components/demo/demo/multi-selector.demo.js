import React from 'react';
import builtinComponents from '../../src/index';

const {
  MultiSelector,
} = builtinComponents;


export default function MultiSelectorDemo() {
  return (
    <MultiSelector
      label="multi selector"
      defaultValue={['卡种']}
      enums={['卡种', '餐厅', '冲值类型', '用餐时段']}
    />
  );
}
