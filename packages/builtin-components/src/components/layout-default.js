import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Map } from 'immutable';
import ComponentRegistry from '@daojs/registry';
import config2Cell from '../utils/config-to-cell';

export default class LayoutDefault extends React.PureComponent {
  getChildContext() {
    return {
      data: this.props.data,
      isUpdating: this.props.isUpdating,
      update: this.props.update,
      componentRegistry: this.props.componentRegistry,
    };
  }

  render() {
    return config2Cell(this.props.layout);
  }
}

LayoutDefault.propTypes = {
  layout: PropTypes.objectOf(any).isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
  isUpdating: PropTypes.instanceOf(Map).isRequired,
  update: PropTypes.func.isRequired,
  componentRegistry: PropTypes.instanceOf(ComponentRegistry).isRequired,
};


LayoutDefault.childContextTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
  isUpdating: PropTypes.instanceOf(Map).isRequired,
  update: PropTypes.func.isRequired,
  componentRegistry: PropTypes.instanceOf(ComponentRegistry).isRequired,
};
