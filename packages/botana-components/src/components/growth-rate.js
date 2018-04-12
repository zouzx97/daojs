import components from '@daojs/builtin-components';
import React from 'react';

const { LineWithDataZoom } = components;

export default function GrowthRate(props) {
  return (
    <LineWithDataZoom {...props} />
  );
}
