import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Map } from 'immutable';
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
    this.update(this.props.output, value);
  }

  render() {
    const {
      input,
      output,
      type,
      ...otherProps
    } = this.props;
    const {
      Control,
    } = this.state;

    if (!input && !output) {
      return <Control {...otherProps} />;
    }

    return (
      <Spin spinning={this.isUpdating.get(input)}>
        <Control
          value={this.data.get(input)}
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
};

Cell.defaultProps = {
  input: undefined,
  output: undefined,
};

Cell.contextTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
  isUpdating: PropTypes.instanceOf(Map).isRequired,
  update: PropTypes.func.isRequired,
};
