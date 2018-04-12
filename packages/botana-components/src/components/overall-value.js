import PropTypes from 'prop-types';
import React from 'react';

export default function OverallValue(props) {
  return (
    <span>{`总${props.key2name[props.metricDimensions[0]]}为${props.source}`}</span>
  );
}

OverallValue.propTypes = {
  source: PropTypes.number.isRequired,
  metricDimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  key2name: PropTypes.objectOf(PropTypes.string).isRequired,
};
