import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './landing';
import ExamplePage from './example-page';

import {
  Fundamentals,
  AIOperations,
  CustomStories,
} from './stories/index';

const rawExamples = [
  {
    name: 'sodexo',
    description: '描述sodexo项目',
    coverImage: '/img/sodexo.png',
    logoImage: '/img/sodexo.logo.png',
    categories: [{
      id: '35a62e19-4b1b-4541-85aa-aa86b56c44ae',
      name: '基础面板',
      stories: Fundamentals,
    }, {
      id: 'b115caf6-620f-4a07-9cff-7f813d7e2c5f',
      name: '智能运营助手',
      stories: AIOperations,
    }, {
      id: '0dabd0a2-1124-54a3-98dc-685aa110d129',
      name: '定制story',
      stories: CustomStories,
      isStoryEditable: true,
    }],
  },
];

const examples = _.map(rawExamples, rawExample => _.defaults({}, rawExample, {
  component() {
    return (
      <ExamplePage
        title={rawExample.name}
        logo={rawExample.logoImage}
        categories={rawExample.categories}
      />
    );
  },
}));

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
