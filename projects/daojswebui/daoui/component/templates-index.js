import React from 'react';
import _ from 'lodash';
import { Route, Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import TemplatesHome from './templates-home';
import TemplateView from './template-view';
import TemplateStoriesList from './template-stories-list';
import rawExamples from '../templates-list';

const examples = _.map(rawExamples, rawExample => _.defaults({}, rawExample, {
  pageComponent() {
    return (
      <TemplateView
        name={rawExample.name}
        title={rawExample.name}
        logo={rawExample.logoImage}
        categories={rawExample.categories}
        id={rawExample.id}
        frameType={rawExample.frameType}
      />
    );
  },
  storiesListComponent() {
    return (
      <TemplateStoriesList
        name={rawExample.name}
        categories={rawExample.categories}
      />
    );
  },
}));

const breadcrumbNameMap = _.reduce(rawExamples, (memo, { name }) => _.defaults({}, memo, ({
  [`/templates/${name}`]: name,
  [`/templates/${name}/stories`]: `stories of ${name}`,
})), {
  '/templates': 'all templates',
});

const TemplatesIndex = withRouter((props) => {
  const { location, match } = props;
  const pathSnippets = _.compact(_.split(location.pathname, '/'));

  const breadcrumbItems = _.map(pathSnippets, (p, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });

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
      <div>
        {_.map(examples, example => (
          <Route exact key={`${example.name}-page`} path={`${match.url}/${example.name}`} component={example.pageComponent} />
        ))}
        {_.map(examples, example => (
          <Route key={`${example.name}-stories`} path={`${match.url}/${example.name}/stories`} component={example.storiesListComponent} />
        ))}
        <Route exact path={match.url} component={() => <TemplatesHome examples={examples} />} />
      </div>
    </div>
  );
});

export default TemplatesIndex;
