import _ from 'lodash';
import { withProps } from 'recompose';

import AtlasChart from './atlas-chart';

const enhance = withProps({
  getOption: ({ source, axisData, metricDimensions }) => ({
    legend: {},
    tooltip: {},
    yAxis: {},
    xAxis: {
      data: axisData,
      type: 'category',
    },
    series: _.chain(metricDimensions)
      .map(dim => ({
        type: 'bar',
        name: dim,
        data: _.map(source, row => row[dim]),
        stack: 'total',
      }))
      .value(),
  }),
});

export default enhance(AtlasChart);
