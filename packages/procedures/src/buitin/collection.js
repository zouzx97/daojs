import _ from 'lodash';

export const includes = ({
  collection,
  value,
  fromIndex = 0,
}) => _.includes(collection, value, fromIndex);
