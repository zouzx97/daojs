import React from 'react';
import ReactDOM from 'react-dom';
import {
  AppFrame,
  ComponentRegistry,
} from '@daojs/ui';
import * as botanaComponents from '@daojs/botana-components';

import * as components from './components';
import {
  DefaultStories,
  CustomStories,
} from './stories/index';

ComponentRegistry.register(components).register(botanaComponents);
ReactDOM.render(
  <AppFrame
    title="@daojs/project-demo"
    logo="img/logo.png"
    categories={[{
      id: '35a62e19-4b1b-4541-85aa-aa86b56c44ae',
      name: 'Default stories',
      stories: DefaultStories,
    }, {
      id: '0dabd0a2-1124-54a3-98dc-685aa110d129',
      name: 'Custom stories',
      stories: CustomStories,
      isStoryEditable: true,
    }]}
    defaultStory="48d0a126-0208-5c36-9bfe-2035a60789e1"
    componentRegistry={ComponentRegistry}
  />,
  document.getElementById('container'),
);
