import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import Promise from 'bluebird';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 30; // px
const marginX = 10; // px
const marginY = 10; // px

const storageKey = 'dao-layout';

const layoutStore = (() => {
  let storage;
  try {
    storage = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (err) {
    storage = {};
  }
  return storage;
})();

function getLayout({ storyId, sectionIds }) {
  const sectionLayouts = layoutStore[storyId];
  return Promise
    .resolve(_.filter(sectionLayouts, sectionLayout => _.includes(sectionIds, sectionLayout.i)));
}

export function setLayout({ storyId, storyLayout }) {
  layoutStore[storyId] = storyLayout;
  localStorage.setItem(storageKey, JSON.stringify(layoutStore));
  return Promise.resolve();
}


export default class AdjustableContainer extends Component {
  constructor(props) {
    super(props);

    /* eslint-disable immutable/no-mutation */
    this.state = {
      layout: [],
    };
    /* eslint-enable */
  }

  componentDidMount() {
    const items = _.isArray(this.props.items) ?
      this.props.items : [this.props.items];

    getLayout({
      storyId: this.props.id,
      sectionIds: _.map(items, item => _.result(item, 'key', item)),
    }).then((layout) => {
      this.setState({ layout });
    });
  }

  onLayoutChange(newLayout) {
    this.setState({ layout: newLayout });
  }

  saveLayout(newLayout) {
    setLayout({
      storyId: this.props.id,
      storyLayout: newLayout,
    });
  }

  render() {
    return (
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{ lg: this.state.layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={rowHeight}
        margin={[marginX, marginY]}
        onDrag={args => this.onLayoutChange(args)}
        onResize={args => this.onLayoutChange(args)}
        onDragStop={args => this.saveLayout(args)}
        onResizeStop={args => this.saveLayout(args)}
      >
        <StoryboardContext.Consumer>
          { ({ agent }) => _.map(this.props.items, item => <Cell key={item.id} agent={agent} {...item} />) }
        </StoryboardContext.Consumer>
      </ResponsiveReactGridLayout>
    );
  }
}

AdjustableContainer.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.objectOf(any),
    PropTypes.string,
  ])),
};

AdjustableContainer.defaultProps = {
  items: [],
};
