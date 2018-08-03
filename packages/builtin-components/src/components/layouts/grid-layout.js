import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@daojs/contexts';
import colorPanel from './color-panel';

export default function GridLayout(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {map(props.children, (child, index) => (
        <ThemeContext.Provider
          key={String(index)}
          value={{
            primaryColor: colorPanel[index % colorPanel.length],
          }}
        >
          {child}
        </ThemeContext.Provider>
      ))}
    </div>
  );
}

GridLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

GridLayout.defaultProps = {
  children: [],
};
