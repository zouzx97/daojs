import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import _ from 'lodash';
import JSONTree from 'react-json-tree';

const { Panel } = Collapse;

const ExampleStoriesList = ({ categories }) => (
  <div style={{ clear: 'both' }}>
    <Collapse>
      {_.map(categories, ({ name: catName, stories }) => (
        <Panel header={catName} key={catName}>
          <JSONTree data={stories} />
        </Panel>
      ))}
    </Collapse>
  </div>
);

ExampleStoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ExampleStoriesList;
