/* eslint-disable class-methods-use-this */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';


export default class BaseChart extends PureComponent {
  getSource() {
    const {
      source,
    } = this.props;
    if (_.isNil(source)) {
      throw new Error('Chart source is nil');
    }

    return source;
  }

  getDimensions() {
    return _.chain(this.getSource())
      .first()
      .keys()
      .value();
  }

  getAxisDimension() {
    return _.first(this.props.axisDimensions) ||
      _.first(this.getDimensions());
  }

  getAxisData() {
    const axisDim = this.getAxisDimension();
    return _.chain(this.getSource())
      .map(row => this.axisValueConverter(row[axisDim], axisDim))
      .value();
  }

  getAxisOption() {
    return {
      data: this.getAxisData(),
      type: 'category',
      boundaryGap: false,
    };
  }

  getMetricDimensions() {
    return _.isEmpty(this.props.metricDimensions) ?
      _.difference(this.getDimensions(), [this.getAxisDimension()]) :
      this.props.metricDimensions;
  }

  getSeriesOption() {
    throw new Error('Unimplement BaseChart.getSeriesOption()');
  }

  getTitleOption() {
    return {
      text: this.props.title,
    };
  }

  getOption() {
    return {
      title: this.getTitleOption(),
      series: this.getSeriesOption(),
      backgroundColor: _.get(this.props, 'style.backgroundColor'),
    };
  }

  getEvents() {
    return {};
  }

  getStyle() {
    return {};
  }

  axisValueConverter(value, key) {
    if (_.isString(key) && _.toLower(key) === 'timestamp' && _.isString(value)) {
      return value.replace('T00:00:00Z', '').replace('T00:00:00.000Z', '');
    }
    return value;
  }

  render() {
    if (_.isEmpty(this.getSource())) {
      return null;
    }
    const {
      style,
      ...otherProps
    } = this.props;
    return (
      <ReactEcharts
        theme="theme1"
        option={this.getOption()}
        notMerge={true} //eslint-disable-line
        onEvents={this.getEvents()}
        style={_.defaults({}, style, this.getStyle())}
        {...otherProps}
      />
    );
  }
}

BaseChart.propTypes = {
  source: PropTypes.arrayOf(PropTypes.any).isRequired,
  axisDimensions: PropTypes.arrayOf(PropTypes.string),
  metricDimensions: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

BaseChart.defaultProps = {
  axisDimensions: [],
  metricDimensions: [],
  title: null,
  style: {},
};
