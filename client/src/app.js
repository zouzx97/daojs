import _ from 'lodash';
import React from 'react';
import axios from 'axios';

import Registry from './registry';
import { SERVICE_URL } from './constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
    this.loadEntryList();
  }

  loadEntryList() {
    axios.get(`${SERVICE_URL}/registry`)
      .then(({ data }) => this.setState(_.defaults({
        entries: data,
      }, this.state)));
  }

  submit({ name, content, dependencies }) {
    const url = `${SERVICE_URL}/registry/${name}`;
    axios
      .post(url, { content, dependencies }, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        this.loadEntryList();
        this.setState(_.defaults({
          entry: name,
        }, this.state));
      });
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
          <Registry
            entries={this.state.entries}
            onSubmit={options => this.submit(options)}
          />
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
