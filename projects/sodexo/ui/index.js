import React from 'react';
import ReactDOM from 'react-dom';
import {
  ComponentRegistry,
  StoryBoard,
} from '@daojs/ui';
import components from './components';
import story from './stories/dummy.yaml';

ComponentRegistry.register(components);

ReactDOM.render(
  document.getElementById('container'),
  <Dashboard story={story} />,
);
