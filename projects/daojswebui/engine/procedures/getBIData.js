import _ from 'lodash';
import { slice } from '@daojs/procedures/botana';

export function getRevenue(args = {}) {
  const params = _.omit(args, 'time');
  return slice({
    Metrics: {
      Name: 'Revenue',
      Tag: 'Trend',
    },
    Granularity: 'Weekly',
    StartTime: '2018-01-01T00:00:00.000Z',
    EndTime: '2018-05-01T00:00:00.000Z',
    Filters: {},
    ...params,
    ...args.time,
  }).then(data => ({ source: data }));
}

export function getUserCount(args = {}) {
  const params = _.omit(args, 'time');
  return slice({
    Metrics: {
      Name: 'UserCount',
      Tag: 'Trend',
    },
    Granularity: 'Weekly',
    StartTime: '2018-01-01T00:00:00.000Z',
    EndTime: '2018-05-01T00:00:00.000Z',
    Filters: {},
    ...params,
    ...args.time,
  }).then(data => ({ source: data }));
}

export function getChargeCount(args = {}) {
  const params = _.omit(args, 'time');
  return slice({
    Metrics: {
      Name: 'ChargeCount',
      Tag: 'Trend',
    },
    Granularity: 'Weekly',
    StartTime: '2018-01-01T00:00:00.000Z',
    EndTime: '2018-05-01T00:00:00.000Z',
    Filters: {},
    ...params,
    ...args.time,
  }).then(data => ({ source: data }));
}
