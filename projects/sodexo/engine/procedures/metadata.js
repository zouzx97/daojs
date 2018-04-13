import _ from 'lodash';

const BranchName = [
  '汇总',
  '员工餐厅',
  '粤菜餐厅',
  '北京小院',
  '咖啡厅',
  '咖啡屋',
  '咖喱屋',
  '自助餐厅',
  '西餐厅',
  '意大利餐厅',
];

const MealName = [
  '汇总',
  '早餐',
  '午餐',
  '晚餐',
];

const CardType = [
  '汇总',
  '员工卡',
  '访客卡',
];

const Granularity = [
  'Daily',
  'Weekly',
  'Monthly',
];

const GranularityTexts = {
  Daily: '按天',
  Weekly: '按周',
  Monthly: '按月',
};

const enumTypes = {
  BranchName,
  MealName,
  CardType,
  Granularity,
};

const enumTexts = {
  Granularity: GranularityTexts,
};

export function getEnum(name) {
  return enumTypes[name];
}

export function getEnumSelectorProps(name) {
  return _.map(enumTypes[name], value => ({
    value,
    text: enumTexts[name][value],
  }));
}
