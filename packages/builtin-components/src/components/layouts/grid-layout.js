import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@daojs/contexts';

const colorPanel = [
  "#4472c4",
  "#ed7d31",
  "#a5a5a5",
  "#ffc000",
  "#5b9bd5",
  "#70ad47",
];

export default function GridLayout(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {props.children.map((child, index) => (
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
