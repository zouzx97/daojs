import components from '@daojs/builtin-components';
import React from 'react';

const { LineWithDataZoom } = components;

export default function Trend(props) {
  return (
    <LineWithDataZoom source={props[0].Values} {...props} />
  );
}
