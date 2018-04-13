import components from '@daojs/builtin-components';
import React from 'react';
import _ from 'lodash';

const { Donut } = components;

export default function Percentage(props) {
  // convert array-like object to array
  const source = _.reduce(
    props,
    (memo, value, key) => (_.isFinite(key - 0) ? memo.concat(value) : memo),
    [],
  );

  return (
    <Donut
      source={source}
    />
  );
}
