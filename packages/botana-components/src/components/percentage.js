import components from '@daojs/builtin-components';
import React from 'react';

const { Donut } = components;

export default function Percentage(props) {
  return (
    <Donut
      source={props}
    />
  );
}
