import React from 'react';
import ReactDOM from 'react-dom';
import {
  StoryBoard,
  DaoJSApp,
} from '@daojs/ui';
import builtinComponents from '@daojs/builtin-components';
import AsyncRegister from '@daojs/async-register';
import stories from './stories';
import components from './components';

// ReactDOM.render(document.getElementById('container'), (
//   <DaoJSApp
//     components = {new AsyncRegister().register(builtinComponents).register(components)}
//     stroies = {new AsyncRegister().register(stories)}
//   />
// ));
//

ReactDOM.render(document.getElementById('container'), (
  <Dashboard
    components = {new AsyncRegister().register(builtinComponents).register(components)}
    story = {stories.defaultStory}
  />
));
