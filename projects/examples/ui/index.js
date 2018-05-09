import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { HashRouter, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

import Landing from './landing';
import ExamplePage from './example-page';
import ExampleStoriesList from './example-stories-list';
import rawExamples from './examples-list';

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
