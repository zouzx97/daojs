import React from 'react';
import PropTypes, { any } from 'prop-types';
import config2Cell from '../utils/config-to-cell';

export default class LayoutDefault extends React.PureComponent {
  render() {
    return config2Cell(this.props.layout);
  }
}

LayoutDefault.propTypes = {
  layout: PropTypes.objectOf(any).isRequired,
};
