import components from '@daojs/builtin-components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const { LineWithMarkArea } = components;

export default function Promotion(props) {
  const [actualMetric, expectedMetric] = props.metricDimensions;
  const data = _.map(props.source, item => ({
    delta: item[actualMetric] - item[expectedMetric],
    ...item,
  }));

  return (
    <LineWithMarkArea
      source={data}
      areaStyle={{
        delta: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'green' },
              { offset: 0.7, color: 'white' },
              { offset: 1, color: 'red' },
            ],
          },
        },
      }}
      markArea={_.map(props.promotions, promo => ([{
        name: promo.name,
        xAxis: promo.start,
      }, {
        xAxis: promo.end,
      }]))}
      {...props}
    />
  );
}

Promotion.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
  promotions: PropTypes.arrayOf(PropTypes.object).isRequired,
  axisDimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  metricDimensions: PropTypes.arrayOf(PropTypes.string).isRequired, // actual, expected
};
