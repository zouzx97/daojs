import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import _ from 'lodash';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioSelectValue: props.defaultValue,
    };
  }

  onRadioChange(e) {
    this.props.update(e.target.value);
    this.setState({ radioSelectValue: e.target.value });
  }

  render() {
    const {
      enums,
    } = this.props;
    const opts = _.map(enums, item => ({ value: item.value || item, text: item.text || item }));

    return enums.length > 0 ? (
      <Radio.Group
        value={this.state.radioSelectValue}
        onChange={args => this.onRadioChange(args)}
      >
        {_.map(opts, (opt) => {
          const { value: optKey, text } = opt;
          return (<Radio.Button key={optKey} value={optKey}>{text}</Radio.Button>);
        })}
      </Radio.Group>
    ) : null;
  }
}

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  enums: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  update: PropTypes.func,
};

RadioGroup.defaultProps = {
  update: _.noop,
  defaultValue: undefined,
};
