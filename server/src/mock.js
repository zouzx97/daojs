const {add} = require('./store');

const CONTENT_APP = `
export default function App() {
  return <div>Hello world!</div>;
}
`;

const CONTENT_INDEX = `
ReactDOM.render(
  <App/>,
  document.getElementById('container')
);
`;

add('app.js', {
  dependencies: {},
  content: CONTENT_APP,
});

add('index.js', {
  dependencies: {
    ReactDOM: 'react-dom',
    App: 'app.js',
  },
  content: CONTENT_INDEX,
});
