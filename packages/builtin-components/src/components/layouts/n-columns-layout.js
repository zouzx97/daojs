import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ThemeContext } from '@daojs/contexts';
import colorPanel from './color-panel';

export default function NColumnsLayout({
  children,
  n,
}) {
  const rowCount = Math.ceil(children.length / n);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {
        _.range(rowCount).map(row => (
          <div
            key={String(row)}
            style={{
              display: 'flex',
            }}
          >
            {children.slice(row * n, (row + 1) * n).map((child, index) => (
              <div
                key={String(index)}
                style={{
                  flex: '1 1 auto',
                }}
              >
                <ThemeContext.Provider
                  value={{
                    primaryColor: colorPanel[((row * n) + index) % colorPanel.length],
                  }}
                >
                  {child}
                </ThemeContext.Provider>
              </div>
            ))}
          </div>
        ))
      }
    </div>
  );
}

NColumnsLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  n: PropTypes.number.isRequired,
};

NColumnsLayout.defaultProps = {
  children: [],
};
