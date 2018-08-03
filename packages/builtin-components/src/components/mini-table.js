import React from 'react';
import _ from 'lodash';

export default function MiniTable(props) {
  const { data } = props; // eslint-disable-line react/prop-types

  return (
    <div>
      { _.map(data, row => (
        <div
          key={_.uniqueId('mini-table-row-')}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <div style={{ flex: 2, color: 'rgba(255,255,255,0.9)' }}>
            { row[0] }
          </div>
          <div style={{
            flex: 1,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'right',
          }}
          >
            { row[1] }
          </div>
        </div>
      ))
      }
    </div>
  );
}
