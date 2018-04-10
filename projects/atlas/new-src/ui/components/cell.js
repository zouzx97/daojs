import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import componentRegistry from './index';

export default class Cell extends PureComponent {
  // Would get console warning due to https://github.com/gaearon/react-hot-loader/issues/918
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type !== prevState.type) {
      return {
        type: nextProps.type,
      };
    }
    // null indicates that the new props do not require any state updates
    return null;
  }

  constructor({
    type,
  } = {}) {
    super();
    this.state = {
      type,
      Control: _.constant(null),
    };
    this.updateControl(true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.type !== this.state.type) {
      this.updateControl();
    }
  }

  componentWillUnmount() {
    // Cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    if (this.controlPromise) {
      this.controlPromise.cancel();
    }
  }

  updateControl(isCtor = false) {
    const controlPromise = componentRegistry.get(this.state.type);
    if (controlPromise.isFulfilled()) {
      // No need to wait for next tick
      const Control = controlPromise.value();
      if (isCtor) {
        this.state = _.defaults({
          Control,
        }, this.state);
      } else {
        this.setState({
          Control,
        });
      }
    } else {
      // Keep the promise in case it needs to be canceled
      this.controlPromise = controlPromise;
      controlPromise.then((Control) => {
        this.setState({
          Control,
        });
      });
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

