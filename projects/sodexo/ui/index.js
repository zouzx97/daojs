import React from 'react';
import ReactDOM from 'react-dom';
import {
  DaoFrame,
  ComponentRegistry,
} from '@daojs/ui';
import components from './components';
import {
  Fundamentals,
  AIOperations,
} from './stories/index';

ComponentRegistry.register(components);
ReactDOM.render(
  <DaoFrame
    title="索迪斯大数据平台"
    logo="img/sodexo.png"
    categories={[{
      name: '基础面板',
      stories: Fundamentals,
    }, {
      name: '智能运营助手',
      stories: AIOperations,
    }]}
    defaultStory="计算"
    componentRegistry={ComponentRegistry}
  />,
  document.getElementById('container'),
);
