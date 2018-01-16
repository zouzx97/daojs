const mockEntry = `
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app.js';

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);
`;

const mockDep = `
import React from 'react';

export function App() {
  return <div>Hello world!</div>;
}
`;

module.exports = {
  'index.js': mockEntry,
  'app.js': mockDep,
};
