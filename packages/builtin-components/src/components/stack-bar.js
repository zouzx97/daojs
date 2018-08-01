import map from 'lodash/map';
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
    series: map(metricDimensions, dim => ({
      type: 'bar',
      name: dim,
      data: map(source, dim),
      stack: 'total',
    })),
  }),
});

export default enhance(AtlasChart);
