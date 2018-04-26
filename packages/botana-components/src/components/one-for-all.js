import PropTypes from 'prop-types';
import React from 'react';
import Trend from './trend';
import Percentage from './percentage';
import Prediction from './prediction';

const insightCharts = {
  slice: Trend,
  ranker: Percentage,
  predicate: Prediction,
};

export default function OneForAll(props) {
  const Chart = insightCharts[props.insight];

  return <Chart {...props} />;
}

OneForAll.propTypes = {
  insight: PropTypes.string.isRequired,
};
