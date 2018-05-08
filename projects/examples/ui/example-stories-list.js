import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import _ from 'lodash';

const { Panel } = Collapse;

const ExampleStoriesList = ({ categories }) => (
  <Collapse>
    {_.map(categories, ({ name, stories }) => (
      <Panel header={name} key={name}>
        <p>{JSON.stringify(stories)}</p>
      </Panel>
    ))}
  </Collapse>
);

ExampleStoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ExampleStoriesList;
