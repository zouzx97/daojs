import components from '@daojs/builtin-components';
import React from 'react';

const { LineWithDataZoom } = components;

export default function Cumulative(props) {
  return (
    <LineWithDataZoom {...props} />
  );
}
