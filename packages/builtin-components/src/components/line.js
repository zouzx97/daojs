import PropTypes from 'prop-types';
import _ from 'lodash';
import BaseChart from './base';

/* Demo usage
<Line
  source: [{
    timestamp: '2018/1/1',
    value: 10,
  }, {
    timestamp: '2018/1/2',
    value: 20,
  }],
  // Axis dimension would be drawn as X axis.
  // Although line chart only supports 1 axis dimension,
  // we define the prop as array for better extensibility
  axisDimensions: ['timestamp']
  // Metric dimensions prop is optional.
  // If not specified, all dimensions except axis dimensions would be used.
  metricDimensions: ['value']
/>
*/
export default class Line extends BaseChart {
  getSeriesOption() {
    const source = this.getSource();
    const ret = _.chain(this.getMetricDimensions())
      .map(dim => ({
        type: 'line',
        name: _.get(this.props.key2name, dim, dim),
        lineStyle: {
          type: _.get(this.props.lineStyle, dim, 'solid'),
        },
        areaStyle: _.get(this.props.areaStyle, dim),
        data: _.map(source, row => row[dim]),
      }))
      .value();

    return ret;
  }

  getOption() {
    return {
      legend: {
        show: this.props.showAxis,
      },
      tooltip: {
        trigger: 'axis',
        show: this.props.showAxis,
      },
      yAxis: {
        type: 'value',
        show: this.props.showAxis,
      },
      xAxis: this.getAxisOption(),
      ...super.getOption(),
    };
  }

  getEvents() {
    return {
      click: args =>
        this.props.onSlicerChange(_.defaults(
          {}, { dataObj: _.zipObject(this.getDimensions(), args.data) },
          args,
        )),
    };
  }
}

Line.propTypes = {
  onSlicerChange: PropTypes.func,
  showAxis: PropTypes.bool,
};

Line.defaultProps = {
  onSlicerChange: _.noop,
  showAxis: true,
};
