import React from 'react';
import _ from 'lodash';
import Cell from '../components/cell';

export default function config2Cell(item) {
  const {
    key = item,
    input = _.isString(item) ? item : undefined,
    output,
    type = _.isString(item) ? item : 'Flexbox',
    layout = {},
    ...otherProps
  } = item;

  return (
    <Cell
      id={key}
      key={key}
      input={input}
      output={output}
      type={type}
      layout={layout}
      {...otherProps}
    />
  );
}
