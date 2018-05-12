import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import AtlasChart from './atlas-chart';

export default function Bar(props) {
  return (
    <AtlasChart
      {...props}
      getOption={({
        source,
        metricDimensions,
        axisOption,
      }) => {
        const argumentAxis = {
          boundaryGap: true,
          ...axisOption,
        };

        const dependentAxis = {};

        return {
          legend: {
            show: this.props.showAxis,
          },
          tooltip: {
            show: this.props.showAxis,
          },
          yAxis: props.isHorizontal ? argumentAxis : dependentAxis,
          xAxis: props.isHorizontal ? dependentAxis : argumentAxis,
          series: _.map(metricDimensions, dim => ({
            type: 'bar',
            name: _.get(props.key2name, dim, dim),
            data: _.map(source, row => row[dim]),
          })),
        };
      }}
    />
  );
}

Bar.propTypes = {
  isHorizontal: PropTypes.bool,
};

Bar.defaultProps = {
  isHorizontal: false,
};
