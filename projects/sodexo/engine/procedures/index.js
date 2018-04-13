import _ from 'lodash';

import builtProcedures from '@daojs/procedures/builtin';
import botanaProcedures from '@daojs/procedures/botana';

export default {
  sum: _.sum,
  stringify: _.toString,
  ...botanaProcedures,
  ...builtProcedures,
};
