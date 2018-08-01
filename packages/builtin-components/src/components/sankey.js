import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Sankey extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: {
        type: 'sankey',
        layout: 'none',
        data: _([..._.map(source, 'Source'), ..._.map(source, 'Target')]).uniq().map(name => ({ name })).value(),
        links: _.map(source, link => ({
          source: link.Source,
          target: link.Target,
          value: link.Value,
        })),
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
