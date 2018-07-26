import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDimensionSeries } from '../utils';

export default class Scatter extends PureComponent {
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
        source: newSource,
        dimensions,
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        scale: true,
      },
      series: getDimensionSeries({
        dimensions,
        type: 'scatter',
      }),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
