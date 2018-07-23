import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';
import { timeInterval } from 'rxjs/operator/timeInterval';

export default class Radar extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
  }



  render() {
    const { source} = this.props;
   

    var key = _.map(source, _.keys)[0];
    key = key.slice(0, key.length - 1);

    const option = {
      legend: {},
      tooltip: {},
      radar: {
        indicator: _.map(source, item => ({
          name: item.product,
          max: _.max([item['2015'], item['2016'], item['2017']]) + 10,
        })),
      },
      series: {
        type: 'radar',
        data: _.map(key, item => ({
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
