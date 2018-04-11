import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Map } from 'immutable';
import config2Cell from '../utils/config-to-cell';

export default class Layout extends React.PureComponent {
  getChildContext() {
    return {
      read: key => this.props.data.get(key),
      isUpdating: key => this.props.isUpdating.get(key),
      update: this.props.update,
    };
  }

  render() {
    return config2Cell(this.props.layout);
  }
}

Layout.propTypes = {
  layout: PropTypes.objectOf(any).isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
  isUpdating: PropTypes.instanceOf(Map).isRequired,
  update: PropTypes.func.isRequired,
};
