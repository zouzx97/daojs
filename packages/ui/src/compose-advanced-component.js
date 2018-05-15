import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Storyboard from './storyboard';

export default function composeAdvancedComponent({
  input,
  output,
  implementation: {
    data,
    layout,
  },
}) {
  return ({
    update,
    ...rest
  }) => (
    <Storyboard
      story={{
        data: {
          ...data,
          [input]: rest,
          [output]: null,
        },
        layout,
      }}
      engine="dist/engine.js"
    />
  );
}
