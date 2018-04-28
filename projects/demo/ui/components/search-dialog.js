import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

const keywordsMapper = {
  insight: {
    predicate: ['预测', 'predicate'],
    ranker: ['排序', 'sort', 'ranker'],
    slice: ['切片', 'slice'],
  },
  Granularity: {
    Daily: ['天', 'day', 'daily'],
    Weekly: ['周', 'week', 'weekly'],
    Monthly: ['月', 'month', 'monthly'],
  },
  clientInsight: {
    identity: ['原', 'identity'],
    cumulative: ['累积', 'cumulative'],
    growthRate: ['增长', 'growth'],
  },
  MealName: {
    早餐: ['早餐', 'breakfast'],
    午餐: ['午餐', '中', 'launch'],
    晚餐: ['晚餐', 'dinner'],
  },
  BranchName: {
    员工餐厅: ['员工餐厅', 'employee'],
    粤菜餐厅: ['粤菜餐厅', '粤菜', 'yuecai'],
    北京小院: ['北京小院'],
    咖啡厅: ['咖啡厅', '咖啡', 'coffee'],
    咖喱屋: ['咖喱', '咖喱屋'],
    自助餐厅: ['自助餐厅', '自助'],
    西餐厅: ['西餐厅', '西'],
    意大利餐厅: ['意大利餐厅', '意大利'],
  },
  CardType: {
    员工卡: ['员工', 'employee card'],
    访客卡: ['访客', 'visitor card'],
  },
  Metric: {
    AvgChargeAmount: ['平均充值金额', 'average charge amount', 'average charge', 'avg'],
    ChargeAmount: ['充值金额', 'charge amount', 'charge'],
    ChargeCount: ['充值次数', 'charge count'],
    Deposit: ['盈余', 'deposit'],
    DepositTotal: ['总盈余', 'deposit total'],
    Revenue: ['revenue'],
    UserCount: ['user count', 'usercount'],
  },
  Dimension: {
    BranchName: ['branch name'],
    CardType: ['card type'],
    ChargeType: ['charge type'],
    MealName: ['meal name'],
  },
};

const typeMapper = {
  insight: _.first,
  Granularity: _.first,
  clientInsight: _.first,
  Metric: _.first,
  MealName: _.identity,
  BranchName: _.identity,
  CardType: _.identity,
  Dimension: _.first,
};

function stringProcess(str, output, cb) {
  const affectList = _.isArray(output) ? output : [output];

  const ret = _.reduce(affectList, (result, key) => {
    const tmpResult = {};

    if (_.has(keywordsMapper, key)) {
      _.forEach(keywordsMapper[key], (keywords, value) => {
        if (_.some(keywords, val => _.includes(str, val))) {
          if (tmpResult[key]) {
            tmpResult[key].push(value);
          } else {
            tmpResult[key] = [value];
          }
        }
      });
    }
    return _.defaults({}, result, tmpResult);
  }, {});

  cb(_.mapValues(ret, (val, key) => (typeMapper[key] ? typeMapper[key](val) : val)));
}

export default function SearchDialog(props) {
  return (
    <Search
      placeholder={props.placeholder}
      onSearch={value => stringProcess(value, props.output, props.update)}
      enterButton
    />
  );
}

SearchDialog.propTypes = {
  placeholder: PropTypes.string,
  update: PropTypes.func.isRequired,
  output: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

SearchDialog.defaultProps = {
  placeholder: 'input search text',
  output: undefined,
};
