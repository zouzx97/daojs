import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { HashRouter, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

import Landing from './landing';
import ExamplePage from './example-page';
import ExampleStoriesList from './example-stories-list';

import {
  Fundamentals,
  AIOperations,
  DefaultStories,
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
    }],
  },
  {
    name: 'demo',
    description: 'demo项目',
    coverImage: '/img/demo.png',
    logoImage: '/img/demo.png',
    categories: [{
      id: '35a62e19-4b1b-4541-85aa-aa86b56c44ae',
      name: 'Default stories',
      stories: DefaultStories,
    }, {
      id: '0dabd0a2-1124-54a3-98dc-685aa110d129',
      name: 'Custom stories',
      stories: CustomStories,
      isStoryEditable: true,
    }],
  },
];

const examples = _.map(rawExamples, rawExample => _.defaults({}, rawExample, {
  pageComponent() {
    return (
      <ExamplePage
        name={rawExample.name}
        title={rawExample.name}
        logo={rawExample.logoImage}
        categories={rawExample.categories}
      />
    );
  },
  storiesListComponent() {
    return (
      <ExampleStoriesList
        name={rawExample.name}
        categories={rawExample.categories}
      />
    );
  },
}));

const breadcrumbNameMap = _.reduce(rawExamples, (memo, { name }) => _.defaults({}, memo, ({
  [`/${name}`]: name,
  [`/${name}/stories`]: `stories of ${name}`,
})), {
  all: 'all',
});

const Home = withRouter((props) => {
  const { location } = props;
  const pathSnippets = _.compact(_.split(location.pathname, '/'));

  const extraBreadcrumbItems = _.map(pathSnippets, (p, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);

  return (
    <div>
      <Breadcrumb style={{
        backgroundColor: '#f8f8f8',
        float: 'left',
        padding: 5,
        margin: '0.5rem',
      }}
      >
        {breadcrumbItems}
      </Breadcrumb>
      <Switch>
        {_.map(examples, example => (
          <Route exact key={`${example.name}-page`} path={`/${example.name}`} component={example.pageComponent} />
        ))}
        {_.map(examples, example => (
          <Route key={`${example.name}-stories`} path={`/${example.name}/stories`} component={example.storiesListComponent} />
        ))}
        <Route path="/all" component={() => <Landing examples={examples} />} />
        <Route component={() => <Redirect to="/all" />} />
      </Switch>
    </div>
  );
});

ReactDOM.render(
  <HashRouter >
    <Home />
  </HashRouter >
  ,
  document.getElementById('container'),
);
