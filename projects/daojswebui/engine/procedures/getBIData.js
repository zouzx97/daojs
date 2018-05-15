import _ from 'lodash';
import { slice } from '@daojs/procedures/botana';

export function getBIData(args = {}) {
  const params = _.omit(args, ['time', 'Metric']);
  return slice({
    Metrics: {
      Name: args.Metric,
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
