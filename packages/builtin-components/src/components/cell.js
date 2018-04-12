import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import ComponentRegistry from '@daojs/registry';

export default class Cell extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Control: _.constant(null),
    };
    this.controlPromise = this.context.componentRegistry.get(this.props.type);
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
    this.context.update(this.props.output, value);
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
          value={this.context.data.get(input)}
          {...otherProps}
          update={this.context.updateData}
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
  componentRegistry: PropTypes.instanceOf(ComponentRegistry).isRequired,
};
