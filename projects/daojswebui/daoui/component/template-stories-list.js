import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';

const TemplateStoriesList = ({ value }) => (
  <div style={{ clear: 'both' }}>
    <JSONTree
      data={value}
      shouldExpandNode={(keyName, data, level) => level < 4}
    />
  </div>
);

TemplateStoriesList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TemplateStoriesList;
