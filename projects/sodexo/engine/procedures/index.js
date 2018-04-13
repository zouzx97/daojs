import _ from 'lodash';

import * as builtProcedures from '@daojs/procedures/builtin';
import * as botanaProcedures from '@daojs/procedures/botana';

import * as queryProcedures from './query';

export default {
  sum: _.sum,
  stringify: _.toString,
  ...botanaProcedures,
  ...builtProcedures,
  ...queryProcedures,
};
