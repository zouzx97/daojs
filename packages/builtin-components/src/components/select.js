import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';
import _ from 'lodash';

const { Option } = AntSelect;

export default class Select extends Component {
  onSelectChange(value) {
    this.props.update(value);
  }

  render() {
    const {
      defaultValue,
      enums,
    } = this.props;
    const opts = _.map(enums, item => ({ value: item.value || item, text: item.text || item }));
    const select = enums.length > 0 ? (
      <AntSelect
        style={{ width: '100%', minWidth: '100px' }}
        defaultValue={defaultValue}
        onChange={args => this.onSelectChange(args)}
      >
        {_.map(opts, (opt) => {
          const { value: optKey, text } = opt;
          return (<Option key={optKey} value={optKey}>{text}</Option>);
        })}
      </AntSelect>) : null;

    return (
      <div>
        {this.props.label}
        {select}
      </div>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string,
  enums: PropTypes.arrayOf(PropTypes.any).isRequired,
  defaultValue: PropTypes.string,
  update: PropTypes.func,
};

Select.defaultProps = {
  label: '',
  update: _.noop,
  defaultValue: undefined,
};
