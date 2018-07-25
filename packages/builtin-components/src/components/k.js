import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils/validate';

export default class K extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
    sliceKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { source, sliceKey } = this.props;
    validate(source);
    validate(sliceKey);

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
