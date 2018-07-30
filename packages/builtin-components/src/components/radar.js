import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
// import { validate } from '../utils';

export default class Radar extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
    sliceKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  }


  render() {
    const { source, sliceKey } = this.props;

    const option = {
      legend: {},
      tooltip: {},
      radar: {
        indicator: _.map(source, item => ({
          name: item.product,
          max: _.max(_.map(sliceKey, key => item[key])) + 10,
        })),
      },
      series: {
        type: 'radar',
        data: _.map(sliceKey, item => ({
          name: item,
          value: _.map(source, item),
        })),
      },
    };


    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
