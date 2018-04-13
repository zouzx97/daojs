import _ from 'lodash';

import * as builtProcedures from '@daojs/procedures/builtin';
import * as botanaProcedures from '@daojs/procedures/botana';

export default {
  sum: _.sum,
  stringify: _.toString,
  ...botanaProcedures,
  ...builtProcedures,
};
