import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import config2Cell from '../utils/config-to-cell';

export default class FlexBoxContainer extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          ...this.props.style,
        }}
      >
        {_.map(this.props.childItems, item => config2Cell(item))}
      </div>
    );
  }
}

FlexBoxContainer.propTypes = {
  childItems: PropTypes.arrayOf(any),
  style: PropTypes.objectOf(any),
};

FlexBoxContainer.defaultProps = {
  childItems: [],
  style: {},
};
