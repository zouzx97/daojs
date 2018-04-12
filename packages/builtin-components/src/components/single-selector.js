import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './select';
import RadioGroup from './radio-group';

export default class SingleSelector extends Component {
  onChange(value) {
    this.props.update(value);
  }

  render() {
    const {
      enums,
    } = this.props;

    return enums.length <= 5 ? (
      <RadioGroup {...this.props} />
    ) : (
      <Select {...this.props} />
    );
  }
}

SingleSelector.propTypes = {
  label: PropTypes.string,
  enums: PropTypes.arrayOf(PropTypes.any),
  defaultValue: PropTypes.string,
  update: PropTypes.func.isRequired,
};

SingleSelector.defaultProps = {
  label: null,
  defaultValue: undefined,
  enums: [],
};
