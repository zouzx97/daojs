import React from 'react';
import ReactDOM from 'react-dom';
import DaoFrame from './frame';

ReactDOM.render(
  <DaoFrame
    title="索迪斯大数据平台"
    logo="/img/sodexo.png"
    categories={[{
      name: '基础面板',
      stories: {
        foo1: 'foo1',
        foo2: 'foo2',
      },
    }, {
      name: '智能运营助手',
      stories: {
        bar1: 'bar1',
        bar2: 'bar2',
      },
    }]}
  />,
  document.getElementById('container'),
);

// export { default as DaoFrame } from './frame';
// export { default as Storyboard } from './storyboard';
