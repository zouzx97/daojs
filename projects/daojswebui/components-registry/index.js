import { ComponentRegistry } from '@daojs/ui';
import * as botanaComponents from '@daojs/botana-components';
import * as components from './components/index';

export default ComponentRegistry.register(components).register(botanaComponents);
