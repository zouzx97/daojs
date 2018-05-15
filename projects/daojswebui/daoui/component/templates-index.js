import React from 'react';
import _ from 'lodash';
import { Route, Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import TemplatesHome from './templates-home';
import TemplateView from './template-view';
import TemplateStoriesList from './template-stories-list';
import rawExamples from '../templates-list';
import TemplateEditor from './template-editor';

const examples = _.map(rawExamples, rawExample => _.defaults({}, rawExample, {
  pageComponent() {
    return (
      <TemplateView
        {...rawExample}
      />
    );
  },
  viewConfigComponent() {
    return (
      <TemplateStoriesList
        routeName={rawExample.routeName}
        value={rawExample.categories || rawExample.story}
      />
    );
  },
  editConfigComponent() {
    return (
      <TemplateEditor
        config={rawExample}
      />
    );
  },
}));

const breadcrumbNameMap = _.reduce(rawExamples, (memo, { routeName, name }) => _.defaults({}, memo, ({
  [`/templates/${routeName}`]: name,
  [`/templates/${routeName}/config`]: `Config of ${name}`,
  [`/templates/${routeName}/editor`]: `Copy & Try ${name}`,
})), {
  '/templates': 'All templates',
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
          <Route exact key={`${example.routeName}-page`} path={`${match.url}/${example.routeName}`} component={example.pageComponent} />
        ))}
        {_.map(examples, example => (
          <Route key={`${example.routeName}-config`} path={`${match.url}/${example.routeName}/config`} component={example.viewConfigComponent} />
        ))}
        {_.map(examples, example => (
          <Route key={`${example.routeName}-editor`} path={`${match.url}/${example.routeName}/editor`} component={example.editConfigComponent} />
        ))}
        <Route exact path={match.url} component={() => <TemplatesHome examples={examples} />} />
      </div>
    </div>
  );
});

export default TemplatesIndex;
