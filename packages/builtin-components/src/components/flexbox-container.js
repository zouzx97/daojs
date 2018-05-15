import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';

export default class FlexBoxContainer extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          ...this.props.style,
        }}
      >
        {this.props.renderItems()}
      </div>
    );
  }
}

FlexBoxContainer.propTypes = {
  renderItems: PropTypes.func,
  style: PropTypes.objectOf(any),
};

FlexBoxContainer.defaultProps = {
  renderItems: _.noop,
  style: {},
};
