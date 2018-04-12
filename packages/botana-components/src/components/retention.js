import components from '@daojs/builtin-components';
import React from 'react';

const { Heatmap } = components;

export default function Retention(props) {
  return (
    <Heatmap {...props} />
  );
}
