import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  AppFrame,
  ComponentRegistry,
} from '@daojs/ui';
import { Button } from 'antd';

// =.=! I dont like this
import * as botanaComponents from '@daojs/botana-components';
import * as components from './components';

ComponentRegistry.register(botanaComponents).register(components);

const ExamplePage = ({
  name, title, logo, categories,
}) => (
  <div>
    <Button
      type="primary"
      href={`#/${name}/stories`}
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

ExamplePage.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ExamplePage;
