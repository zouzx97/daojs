import components from '@daojs/builtin-components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const { LineWithDataZoom } = components;

export default function Traffic(props) {
  // sort the data to know start & end
  const sorted = _.sortBy(props.source, 'timestamp');

  const first = sorted[0].timestamp;
  const end = _.last(sorted).timestamp;

  const keyed = _.keyBy(sorted, 'timestamp');

  const metricDimension = props.metricDimensions[0];

  // fill 0 data in
  const source = _.map(_.range(first, end + 1, 10 * 60 * 1000), time => ({
    timestamp: (new Date(time)).toLocaleTimeString({}, { hour: '2-digit', minute: '2-digit', hour12: false }),
    [metricDimension]: keyed[time] ? keyed[time][metricDimension] : 0,
  }));

  return (
    <LineWithDataZoom source={source} {...props} />
  );
}

Traffic.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
  metricDimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
