import React from 'react';

import Registry from './registry';
import { SERVICE_URL } from './constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { entry } = this.state;
    const src = entry ? `${SERVICE_URL}/preview/${entry}` : 'about:blank';
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'fixed',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          style={{ flexBasis: 0, flexGrow: 1 }}
        >
          <Registry />
        </div>
        <div style={{ flexBasis: 5 }} />
        <iframe
          style={{ flexBasis: 0, flexGrow: 1 }}
          title="Preview"
          src={src}
        />
      </div>
    );
  }
}
