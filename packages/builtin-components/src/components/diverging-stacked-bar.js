import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class DivergingStacked extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    sliceKey: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  render() {
    /** Data column is like below:
     * [ Date, Negative, Neutral, Positive ]
     * or
     * ['Date', 'Strong negative', 'Negative', 'Neutral', 'Positive', 'Strong positive']
     */
    const { source, sliceKey } = this.props;
    validate(source);
    validate(sliceKey);

    const dimensions = Object.getOwnPropertyNames(source[0]);
    const newSource = _.zip(...(_.map(sliceKey, key => [key, ..._.map(source, key)])));

    if (dimensions.length % 2 !== 0) {
      throw new Error('The attitude columns should be 2x + 1, where 1 refers to neutral column');
    }

    // Add a transparent series so that the center points of neutral could be at same x value
    const neutralIndex = dimensions.length / 2;
    const dummySeries = _.map(newSource.slice(1), row =>
      _.reduce(row, (memo, item, index) => {
        if (index === 0 || index > neutralIndex) {
          return memo;
        }

        return index < neutralIndex ? memo + item : memo + (item / 2);
      }, 0));
    const maxDummy = _.max(dummySeries) + 5; // 5 is the minimum transparent bar value
    const transparentColumn = _.map(dummySeries, value => (maxDummy - value));

    // Insert transparent series at 2nd column of newSource,
    // so the stack bar starts from transparent series
    const newNewSource = _.map(newSource, (item, index) =>
      [_.first(item), index === 0 ? 'dummy' : _.nth(transparentColumn, index - 1), ...item.slice(1)]);

    // transpose 2d-array, so the first row is Y, the other rows are series
    const transposedData = _.zip(...newNewSource);

    const option = {
      legend: {
        data: dimensions.slice(1),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: () => '',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: 'category',
        data: _.first(transposedData).slice(1),
        axisTick: {
          alignWithLabel: true,
        },
      },
      series: _.map(transposedData.slice(1), (series, index) => (_.defaults(
        {
          name: series[0],
          type: 'bar',
          stack: 'total',
          data: series.slice(1),
          // set z so markline will be under bar
          z: 10,
        },
        // If it is transparent/dummy series, set color as transparent, otherwise show label
        index === 0 ?
          {
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
            },
            // draw markline to accross neutral bars
            markLine: {
              silent: true,
              symbol: '',
              label: {
                normal: {
                  show: false,
                },
              },
              lineStyle: {
                color: 'rgb(0,0,0)',
                type: 'solid',
              },
              data: [
                {
                  xAxis: maxDummy,
                },
              ],
            },
          } :
          {
            label: {
              normal: {
                show: true,
                position: 'inside',
              },
            },
          },
      ))),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
