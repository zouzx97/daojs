import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import componentRegistry from './index';

export default class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Control: _.constant(null),
    };
    this.controlPromise = componentRegistry.get(this.props.type);
  }

  componentDidMount() {
    if (this.controlPromise) {
      this.controlPromise.then((Control) => {
        this.setState({ Control });
        this.controlPromise = null;
      });
    }
  }

  componentWillUnmount() {
    // Cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    if (this.controlPromise) {
      this.controlPromise.cancel();
    }
  }

  updateData = (value) => {
    this.props.update(this.props.output, value);
  }

  render() {
    const {
      input,
      output,
      type,
      data,
      ...otherProps
    } = this.props;
    const {
      Control,
    } = this.state;

    if (!input && !output) {
      return <Control {...otherProps} />;
    }

    return (
      <Spin spinning={this.props.isUpdating}>
        <Control
          value={this.props.data}
          {...otherProps}
          update={this.updateData}
        />
      </Spin>
    );
  }
}

Cell.propTypes = {
  input: PropTypes.string,
  output: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isUpdating: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
  ]),
  update: PropTypes.func,
};

Cell.defaultProps = {
  input: undefined,
  output: undefined,
  data: undefined,
  isUpdating: false,
  update: _.noop,
};

