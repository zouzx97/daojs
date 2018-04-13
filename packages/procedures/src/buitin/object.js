import _ from 'lodash';

export const {
  invert,
  keys,
  toPairs,
  values,
} = _;

export const at = ({ object, paths = [] }) => _.at(object, paths);

export const findKey = ({ object, predicate = _.identity }) => _.findKey(object, predicate);

export const findLastKey = ({ object, predicate = _.identity }) => _.findLastKey(object, predicate);

export const has = ({ object, path }) => _.has(object, path);

export const mapKeys = ({ object, iteratee }) => _.mapKeys(object, iteratee);

export const mapValues = ({ object, iteratee }) => _.mapValues(object, iteratee);

export const omit = ({ object, paths = [] }) => _.omit(object, paths);

export const pick = ({ object, paths = [] }) => _.pick(object, paths);

// get has already occuplied by storage.js
export const result = ({ object, path, defaultValue }) => _.result(object, path, defaultValue);
