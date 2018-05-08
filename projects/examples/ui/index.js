import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './landing';

const SodexoLayout = () => (
  <h1>Sodexo</h1>
);

const examples = [
  {
    name: 'sodexo',
    description: '描述sodexo项目',
    coverImage: '/img/sodexo.png',
    component: SodexoLayout,
  },
];

ReactDOM.render(
  <HashRouter >
    <Switch>
      {_.map(examples, example => <Route key={example.name} path={`/${example.name}`} component={example.component} />)}
      <Route path="/all" component={() => <Landing examples={examples} />} />
      <Route component={() => <Redirect to="/all" />} />
    </Switch>
  </HashRouter >
  ,
  document.getElementById('container'),
);
