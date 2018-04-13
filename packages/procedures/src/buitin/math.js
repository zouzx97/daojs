import {
  sum,
  add as _add,
  ceil,
  divide,
  floor,
  max,
  maxBy,
  mean,
  meanBy,
  min,
  minBy,
  multiply,
  round,
  subtract,
  sumBy,
  constant,
} from 'lodash/fp';

export { sum };

export const add = ({ augend, addend }) => _add(augend, addend);
