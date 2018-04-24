import _ from 'lodash';

export const isEqual = ({ value, other }) => _.isEqual(value, other);

export const or = list => _.reduce(list, (acc, value) => acc || value, false);
