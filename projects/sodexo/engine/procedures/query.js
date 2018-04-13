import _ from 'lodash';

function singlePredicate(dimension) {
  if (_.isNil(dimension)) {
    return null;
  }

  return !dimension.length === 1 && dimension[0] === '汇总' ?
    null :
    _.without(dimension, '汇总');
}

export function queryFilter({
  BranchName,
  MealName,
  CardType,
  ChargeType,
}) {
  return [
    _.pickBy({
      BranchName: singlePredicate(BranchName),
      MealName: singlePredicate(MealName),
      CardType: singlePredicate(CardType),
      ChargeType: singlePredicate(ChargeType),
    }, _.negate(_.isEmpty)),
    'FULL',
  ];
}

export function queryTime(time = '2018-01-01') {
  return `${time}T00:00:00Z`;
}

export function sliceQuery({
  time,

  BranchName,
  MealName,
  CardType,
  ChargeType,

  Collapse,
  Granularity,
  Metrics,
}) {
  return {
    Collapse,
    EndTime: queryTime(time.end),
    Filters: queryFilter({
      BranchName,
      MealName,
      CardType,
      ChargeType,
    }),
    Granularity,
    Metrics,
    StartTime: queryTime(time.start),
  };
}

export function rankerQuery({
  time,
  Dimensions,
  Metrics,
  OrderBy,
  ValueLimit,
}) {
  return {
    StartTime: queryTime(time.start),
    EndTime: queryTime(time.end),
    Dimensions,
    Metrics,
    OrderBy,
    ValueLimit,
  };
}

