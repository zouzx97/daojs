import PropTypes from 'prop-types';
import _ from 'lodash';
import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import BaseChart from './base';

const breakPoint = 500; // px
const bigLayoutCenterLeft = 0.3;
const bigLayoutCenterTop = 0.5;
const smallLayoutCenterLeft = 0.5;
const smallLayoutCenterTop = 0.35;

function toPercentString(float) {
  return `${_.round(float * 100)}%`;
}

class Donut extends BaseChart {
  getMetricDimensions() {
    // Donut chart only supports 1 dimension
    return _.slice(super.getMetricDimensions(), 0, 1);
  }

  getSourceAndAggregateRest() {
    const rawSource = this.getSource();
    const axisDim = this.getAxisDimension();

    const sortedSource = _.reverse(_.sortBy(rawSource, this.getMetricDimensions()));

    const metricKey = _.first(this.getMetricDimensions()) || 'customerId';

    return [..._.slice(sortedSource, 0, 4), {
      [axisDim]: '其他',
      [metricKey]: _.sum(_.map(_.slice(sortedSource, 4), metricKey)),
    }];
  }

  getSeriesOption() {
    const source = this.getSourceAndAggregateRest();
    const axisDim = this.getAxisDimension();
    const { hasLegend } = this.props;

    let position;
    if (hasLegend) {
      position = this.containerWidth > breakPoint ?
        {
          center: [toPercentString(bigLayoutCenterLeft), toPercentString(bigLayoutCenterTop)],
        } :
        {
          center: [toPercentString(smallLayoutCenterLeft), toPercentString(smallLayoutCenterTop)],
        };
    } else {
      position = {
        center: ['50%', '50%'],
      };
    }

    return _.chain(this.getMetricDimensions())
      .map(metricDim => ({
        ...position,
        type: 'pie',
        name: metricDim,
        radius: hasLegend ? ['50%', '70%'] : ['70%', '90%'],
        hoverOffset: 0,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: _.map(source, row => ({
          name: row[axisDim],
          value: row[metricDim],
        })),
      }))
      .value();
  }

  getLegendOption() {
    const source = this.getSourceAndAggregateRest();
    const axisDim = this.getAxisDimension();
    const metricDim = this.getMetricDimensions()[0];
    const position = this.containerWidth > breakPoint ?
      {
        top: 'middle',
        right: '5%',
      } :
      {
        bottom: '5%',
        left: 'center',
      };

    return this.props.hasLegend ?
      {
        ...position,
        orient: 'vertical',
        // Use circle icon for all legends
        data: _.map(source, row => ({
          name: row[axisDim],
          icon: 'circle',
        })),
        formatter: name => _.chain(source)
          .filter(row => row[axisDim] === name)
          .map((() => {
            const total = _.chain(source)
              .reduce((tot, row) => tot + row[metricDim], 0)
              .value();

            return row => `${row[axisDim]} | ${_.round((row[metricDim] / total) * 100, 2)}%    ${row[metricDim]}`;
          })())
          .first()
          .value(),
      } :
      {
        show: false,
      };
  }

  getTitleOption() {
    const {
      title,
      subTitle,
      titleStyle = {},
      hasLegend,
    } = this.props;
    const {
      containerWidth: width,
      containerHeight: height,
    } = this;

    let position;
    if (hasLegend) {
      position = width > breakPoint ?
        {
          left: ((bigLayoutCenterLeft * width) -
          (0.5 * _.min([bigLayoutCenterLeft * width, bigLayoutCenterTop * height])))
          + (0.02 * width),
          top: 'middle',
        } :
        {
          left: 'center',
          top: (smallLayoutCenterTop * height) - (0.02 * height),
        };
    } else {
      position = {
        left: 'center',
        top: 'middle',
      };
    }


    return {
      ...position,
      text: title,
      subtext: subTitle,
      textStyle: {
        fontSize: '18',
        ...titleStyle,
      },
      subtextStyle: {
        fontSize: '14',
      },
    };
  }

  getOption() {
    return {
      legend: this.getLegendOption(),
      tooltip: {
        trigger: 'item',
        // {a} === seriesName, {b} === name, {c} === value, {d} === percent
        formatter: '{b}: {d}%',
      },
      ...super.getOption(),
    };
  }

  getStyle() {
    return this.containerWidth > breakPoint ?
      {
        height: '300px',
      } :
      {
        height: '500px',
      };
  }

  render() {
    return (
      <ContainerDimensions>
        { ({ width, height }) => {
          this.containerWidth = width;
          this.containerHeight = height;
          return super.render();
        }}
      </ContainerDimensions>
    );
  }
}

Donut.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  hasLegend: PropTypes.bool,
};

Donut.defaultProps = {
  title: '',
  subTitle: '',
  hasLegend: true,
};

export default Donut;
