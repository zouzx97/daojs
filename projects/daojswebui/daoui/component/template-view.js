import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  AppFrame,
  ComponentRegistry,
} from '@daojs/ui';
import { Button } from 'antd';

const TemplateView = ({
  name, title, logo, categories,
}) => (
  <div>
    <Button
      type="primary"
      href={`#/templates/${name}/stories`}
      style={{
        margin: '0.5rem 3rem',
      }}
    >
      View stories
    </Button>
    <AppFrame
      title={title}
      logo={logo}
      categories={categories}
      defaultStory={_.head(categories).id}
      componentRegistry={ComponentRegistry}
    />
  </div>
);

TemplateView.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TemplateView;
