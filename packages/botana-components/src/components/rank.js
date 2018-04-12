import components from '@daojs/builtin-components';
import React from 'react';

const { HorizontalBar } = components;

export default function Rank(props) {
  return (
    <HorizontalBar {...props} />
  );
}
