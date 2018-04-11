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
          ...this.props.styles,
        }}
      >
        {_.map(this.props.childItems, item => config2Cell(item))}
      </div>
    );
  }
}

FlexBoxContainer.propTypes = {
  childItems: PropTypes.arrayOf(any),
  styles: PropTypes.objectOf(any),
};

FlexBoxContainer.defaultProps = {
  childItems: [],
  styles: {},
};
