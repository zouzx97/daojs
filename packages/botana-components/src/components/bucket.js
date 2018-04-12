import components from '@daojs/builtin-components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const { Bar } = components;

export default function Bucket(props) {
  const axisDimension = props.axisDimensions[0];
  const metricDimension = props.metricDimensions[0];

  const data = _.map(props.source, item => ({
    [axisDimension]: `${item[axisDimension]} ~ ${item[axisDimension] + props.binStep}`,
    [metricDimension]: item[metricDimension],
  }));

  return <Bar source={data} {...props} />;
}

Bucket.propTypes = {
  binStep: PropTypes.number.isRequired,
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
  axisDimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  metricDimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
