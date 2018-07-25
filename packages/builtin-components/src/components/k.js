import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils/validate';

export default class K extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const sliceKey = Object.getOwnPropertyNames(source[0]);
    const newSource = _.zip(...(_.map(sliceKey, key => [key, ..._.map(source, key)])));

    const dimensions = _.first(newSource);
    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
      },
      dataset: {
        source: newSource.slice(1),
      },
      yAxis: {},
      xAxis: { type: 'category' },
      series: [{
        type: 'candlestick',
        dimensions,
        encode: {
          x: _.first(dimensions),
          y: _.slice(dimensions, 1),
        },
      }],
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
