import React from 'react';
import { LineWithMarkArea } from '@daojs/builtin-components';

export default function Prediction(props) {
  return (
    <span>{JSON.stringify(props)}</span>
  );
}
