const {add} = require('./store');

const CONTENT_APP = `
import React from 'react';

export default function App() {
  return <div>Hello world!</div>;
}
`;

const CONTENT_INDEX = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);
`;

add('app.js', {
  dependencies: [],
  content: CONTENT_APP,
});

add('index.js', {
  dependencies: ['app.js'],
  content: CONTENT_INDEX,
});
