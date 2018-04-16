import components from '@daojs/builtin-components';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

const { LineWithDataZoom } = components;

export default function Trend(props) {
  const dimensions = props.source.map(({ Dimensions }) => Object.values(Dimensions).join(' - '));

  const source = props.source.map(({ Values }, index) => Values.map(({ Value, Timestamp }) => ({
    Timestamp,
    [dimensions[index]]: Value,
  }))).reduce((accumulator, values) => {
    _.each(values, (value) => {
      if (accumulator[value.Timestamp]) {
        _.extend(accumulator[value.Timestamp], value);
      } else {
        _.extend(accumulator, {
          [value.Timestamp]: _.clone(value),
        });
      }
    });
    return accumulator;
  }, {});

  return (
    <LineWithDataZoom
      {...props}
      source={Object.values(source)}
      axisDimensions={['Timestamp']}
      metricDimensions={dimensions}
    />
  );
}

Trend.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
};
