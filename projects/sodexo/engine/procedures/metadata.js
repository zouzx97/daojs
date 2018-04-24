import _ from 'lodash';
import apiMetadata from './api-metadata.yaml';

const DimensionTexts = {
  BranchName: '餐厅',
  CardType: '卡种',
  ChargeType: '冲值类型',
  MealName: '用餐时段',
};

const GranularityTexts = {
  Daily: '按天',
  Weekly: '按周',
  Monthly: '按月',
};

const MetricTexts = {
  AvgChargeAmount: '平均充值金额',
  ChargeAmount: '充值金额',
  ChargeCount: '充值次数',
  Deposit: '盈余',
  DepositTotal: '总盈余',
  Revenue: '营业额',
  UserCount: '用户数',
};

const OrderByTexts = {
  DESC: '降序',
  ASC: '增序',
};

const insightProcedureTexts = {
  predicate: '预测',
  ranker: '排序',
  slice: '切片',
};

const enumTexts = {
  Dimension: DimensionTexts,
  ChargeDimension: DimensionTexts,
  TransactionDimension: DimensionTexts,
  Granularity: GranularityTexts,
  Metric: MetricTexts,
  OrderBy: OrderByTexts,
  insightProcedure: insightProcedureTexts,
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

export function getMetricDimensionType(metric) {
  if (_.includes([
    'AvgChargeAmount',
    'ChargeAmount',
    'ChargeCount',
    'Deposit',
    'DepositTotal',
  ], metric)) {
    return 'ChargeDimension';
  }

  if (_.includes([
    'Revenue',
    'UserCount',
  ], metric)) {
    return 'TransactionDimension';
  }

  throw new Error(`unrecongnized metric ${metric}`);
}
