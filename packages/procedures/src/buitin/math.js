import _ from 'lodash';

export const {
  sum,
  max,
  mean,
  min,
} = _;

export const add = ({ augend = 0, addend = 0 }) => _.add(augend, addend);

export const ceil = ({ number, precision = 0 }) => _.ceil(number, precision);

export const divide = ({ dividend, divisor }) => _.divide(dividend, divisor);

export const floor = ({ number, precision = 0 }) => _.floor(number, precision);

export const maxBy = ({ array, interatee = _.identity }) => _.maxBy(array, interatee);

export const meanBy = ({ array, interatee = _.identity }) => _.meanBy(array, interatee);

export const minBy = ({ array, interatee = _.identity }) => _.minBy(array, interatee);

export const multiply = ({ multiplier, multiplicand }) => _.multiply(multiplier, multiplicand);

export const round = ({ number, precision = 0 }) => _.round(number, precision);

export const subtract = ({ minuend, subtrahend }) => _.subtract(minuend, subtrahend);

export const sumBy = ({ array, interatee = _.identity }) => _.sumBy(array, interatee);
