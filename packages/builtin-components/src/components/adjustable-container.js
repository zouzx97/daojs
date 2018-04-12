import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { getLayout, setLayout } from '../repository';
import config2Cell from '../utils/config-to-cell';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 30; // px
const marginX = 10; // px
const marginY = 10; // px

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
        {_.map(this.props.items, item => config2Cell(item))}
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
