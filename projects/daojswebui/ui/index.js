import React from 'react';
import ReactDOM from 'react-dom';
import {
  AppFrame,
  ComponentRegistry,
} from '@daojs/ui';
import components from './components';
import {
  DefaultStories,
  CustomStories,
} from './stories/index';

ComponentRegistry.register(components);
ReactDOM.render(
  <AppFrame
    title="daojswebui"
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
    defaultStory="35a62e19-4b1b-4541-85aa-aa86b56c44ae"
    componentRegistry={ComponentRegistry}
  />,
  document.getElementById('container'),
);
