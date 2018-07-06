import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import {
  compose,
  setPropTypes,
  withProps,
} from 'recompose';

const propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
};

const propsTranformer = ({ source }) => ({
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        const target = _.get(params, '[1].value') !== '-'
          ? _.get(params, 1)
          : _.get(params, 2);
        return `${target.name}<br/>${target.seriesName} : ${target.value}`;
      },
    },
    legend: {
      show: false,
    },
    xAxis: [
      {
        type: 'category',
        splitLine: { show: false },
        data: _.chain(source).map('time').value,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: (() => {
      const data = _.reduce(source, (memo, cur) => (cur.value >= 0 ? {
        positive: [...memo.positive, cur.value],
        negative: [...memo.negative, '-'],
        assistant: [...memo.assistant, memo.sum],
        sum: memo.sum + cur.value,
      } : {
        positive: [...memo.positive, '-'],
        negative: [...memo.negative, -cur.value],
        assistant: [...memo.assistant, memo.sum + cur.value],
        sum: memo.sum + cur.value,
      }), {
        assistant: [],
        positive: [],
        negative: [],
        sum: 0,
      });

      return [
        {
          name: 'assistant',
          type: 'bar',
          stack: 'total',
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
          data: data.assistant,
        },
        {
          name: 'positive',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
              },
            },
          },
          data: data.positive,
        },
        {
          name: 'negtive',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'bottom',
              },
            },
          },
          data: data.negative,
        },
      ];
    })(),
  },
});

const enhance = compose(
  setPropTypes(propTypes),
  withProps(propsTranformer),
);

const Waterfall = enhance(ReactEcharts);

export default Waterfall;
