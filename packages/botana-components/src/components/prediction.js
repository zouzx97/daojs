import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import components from '@daojs/builtin-components';

const { LineWithMarkArea } = components;

const dict = {
  Predict: '预测',
  Value: '实际',
  LowerBound: '上界',
  UpperBound: '下界',
};

export default function Prediction(props) {
  const dimensions = props.source.map(({ Dimensions }) => Object.values(Dimensions).join(' - '));

  const source = Object.values(props.source.map(({ Values }, index) => Values.map(({
    Value, Timestamp, Predict, LowerBound, UpperBound,
  }) => ({
    Timestamp,
    [`${dimensions[index]}: ${dict[Value]}`]: Value,
    [`${dimensions[index]}: ${dict[Predict]}`]: Predict,
    [`${dimensions[index]}: ${dict[LowerBound]}`]: LowerBound,
    [`${dimensions[index]}: ${dict[UpperBound]}`]: UpperBound,
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
  }, {}));

  const markStart = _.findIndex(source, item => !_.isNull(item.Predict));
  const markEnd = _.findIndex(source, item => _.isNull(item.Value)) - 1;

  return (
    <div>
      {
        source.length > 0 ?
          <LineWithMarkArea
            source={source}
            lineStyle={{ forecast: 'dashed' }}
            axisDimensions={['Timestamp']}
            markArea={[
              {
                name: '预测对照区间',
                xAxis: markStart,
              },
              {
                xAxis: markEnd,
              },
            ]}
          /> :
          <span>无数据</span>
      }
    </div>
  );
}

Prediction.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape({
    Dimensions: PropTypes.object,
    Values: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
};
