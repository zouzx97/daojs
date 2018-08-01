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
        _(rowCount).range().map(row => (
          <div
            key={String(row)}
            style={{
              display: 'flex',
            }}
            className={row === rowCount - 1 ? 'last-row' : null}
          >
            {_.map(children.slice(row * n, (row + 1) * n), (child, index) => (
              <div
                key={String(index)}
                style={{
                  flexBasis: `${100 / n}%`,
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
        )).value()
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
