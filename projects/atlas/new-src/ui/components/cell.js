import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import ComponentRegistry from './component-registry';

export default class Cell extends PureComponent {
  state = {
    Control: _.constant(null),
  }

  componentWillReceiveProps(nextProps) {
    const Control = ComponentRegistry.get(nextProps.type);
    if (Promise.resolve(Control) === Control) { // Get an async compoennt
      Control.then((AsyncControl) => {
        this.setState({
          Control: AsyncControl,
        });
      });
    } else { // Get a sync component
      this.setState({
        Control,
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

