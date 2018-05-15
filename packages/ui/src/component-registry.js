import Registry from '@daojs/registry';
import components from '@daojs/builtin-components';
import advancedComponents from '@daojs/advanced-components';
import containers from './containers';

export default new Registry()
  .register(containers)
  .register(components)
  .register(advancedComponents);
