import _ from 'lodash';

function singlePredicate(dimension) {
  if (_.isNil(dimension)) {
    return null;
  }

  return !dimension.length === 1 && dimension[0] === null ?
    null :
    _.without(dimension, null);
}

export function queryFilter({
  BranchName,
  MealName,
  CardType,
  ChargeType,
}) {
  // return [
  //   _.pickBy({
  //     BranchName: singlePredicate(BranchName),
  //     MealName: singlePredicate(MealName),
  //     CardType: singlePredicate(CardType),
  //     ChargeType: singlePredicate(ChargeType),
  //   }, _.negate(_.isEmpty)),
  //   'FULL',
  // ];
  return _.omitBy({
    BranchName: singlePredicate(BranchName),
    MealName: singlePredicate(MealName),
    CardType: singlePredicate(CardType),
    ChargeType: singlePredicate(ChargeType),
  }, _.isEmpty);
}

export function queryTime(time = '2018-01-01') {
  return `${time}T00:00:00Z`;
}

export function predicateQuery({
  time,

  BranchName,
  MealName,
  CardType,
  ChargeType,

  Granularity,
  Metrics,
}) {
  return {
    StartTime: queryTime(time.start),
    EndTime: queryTime(time.end),
    Filters: queryFilter({
      BranchName,
      MealName,
      CardType,
      ChargeType,
    }),
    Granularity,
    Metrics,
  };
}

export function sliceQuery({
  time,

  BranchName,
  MealName,
  CardType,
  ChargeType,

  // Collapse,
  Granularity,
  Metrics,
}) {
  return {
    // Collapse,
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

  BranchName,
  MealName,
  CardType,
  ChargeType,

  Dimensions,
  Metrics,
  OrderBy,
  ValueLimit,
}) {
  return {
    StartTime: queryTime(time.start),
    EndTime: queryTime(time.end),
    Dimensions,
    Filters: queryFilter({
      BranchName,
      MealName,
      CardType,
      ChargeType,
    }),
    Metrics: {
      ...Metrics,
      Tag: 'Total',
    },
    OrderBy,
    ValueLimit,
  };
}

export function queryArgs({
  insight,
  time,

  BranchName,
  MealName,
  CardType,
  ChargeType,

  Collapse,
  Dimensions,
  Granularity,
  Metrics,
  OrderBy,
  ValueLimit,
}) {
  switch (insight) {
    case 'slice':
      return sliceQuery({
        time,

        BranchName,
        MealName,
        CardType,
        ChargeType,

        Collapse,
        Granularity,
        Metrics,
      });
    case 'ranker':
      return rankerQuery({
        time,

        // ranker API would fail when filter exists
        // BranchName,
        // MealName,
        // CardType,
        // ChargeType,

        Dimensions,
        Metrics,
        OrderBy,
        ValueLimit,
      });
    case 'predicate':
    default:
      return predicateQuery({
        time,

        BranchName,
        MealName,
        CardType,
        ChargeType,

        Granularity,
        Metrics,
      });
  }
}
