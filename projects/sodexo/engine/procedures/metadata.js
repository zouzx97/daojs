import _ from 'lodash';
import apiMetadata from './api-metadata.yaml';

const GranularityTexts = {
  Daily: '按天',
  Weekly: '按周',
  Monthly: '按月',
};

const enumTexts = {
  Granularity: GranularityTexts,
};

export function getEnum(name) {
  const schema = apiMetadata.definitions[name];

  return schema.nullable ? [null, ...schema.enum] : schema.enum;
}

export function getEnumSelectorProps(name) {
  return _.map(getEnum(name), value => ({
    value,
    text: value === null ? '汇总' : _.get(enumTexts, [name, value].join('.'), value),
  }));
}
