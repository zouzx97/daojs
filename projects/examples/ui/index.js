import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './landing';

const examples = [
  {
    name: 'sodexo',
    description: '描述sodexo项目',
    coverImage: '/img/sodexo.png',
  },
];

const SodexoLayout = () => (
  <h1>Sodexo</h1>
);

ReactDOM.render(
  <HashRouter >
    <Switch>
      <Route path="/sodexo" component={SodexoLayout} />
      <Route path="/all" component={() => <Landing examples={examples} />} />
      <Route component={() => <Redirect to="/all" />} />
    </Switch>
  </HashRouter >
  ,
  document.getElementById('container'),
);
