import Registry from '@daojs/registry';
import components from '@daojs/builtin-components';
import containers from './containers';

export default new Registry()
  .register(containers)
  .register(components);
