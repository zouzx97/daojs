import _ from 'lodash';

function singlePredicate(dimension) {
  return dimension.length === 1 && dimension[0] === '汇总' ?
    null :
    _.without(dimension, '汇总');
}

export function queryFilter({
  BranchName,
  MealName,
  CardType,
}) {
  return [
    _.pickBy({
      BranchName: singlePredicate(BranchName),
      MealName: singlePredicate(MealName),
      CardType: singlePredicate(CardType),
    }, _.negate(_.isEmpty)),
    'FULL',
  ];
}
