import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import {
  compose,
  setPropTypes,
  defaultProps,
  withProps,
} from 'recompose';

const propTypes = {
  source: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  title: PropTypes.objectOf(PropTypes.any),
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSlicerChange: PropTypes.func,
};

const spineDefaultProps = {
  onSlicerChange: _.noop,
  title: {},
};

const enhance = compose(
  setPropTypes(propTypes),
  defaultProps(spineDefaultProps),
  withProps(props => ({
    onEvents: {
      click: args =>
        this.props.onSlicerChange(_.defaults({}, {
          dataObj: {
            [_.head(this.props.source)[0]]: args.name,
            [args.seriesName]: args.value,
          },
        }, args)),
    },
    option: {
      title: props.title,
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          // Assume that the first row is X
          data: _.map(props.source, _.head(props.keys)),
        },
      ],
      xAxis: [
        {
          type: 'value',
        },
      ],
      series: _.map(props.keys.slice(1), (key, index) => ({
        name: key,
        type: 'bar',
        // Assume that 2nd and 3rd rows are for comparison.
        // If newSource has more than 3 rows, the rest rows are shown as horizontal bar
        stack: index < 2 ? 'total' : '',
        label: {
          normal: {
            show: true,
            position: 'inside',
          },
        },
        data: _.map(props.source, key),
      })),
    },
  })),
);

export default enhance(ReactEcharts);
