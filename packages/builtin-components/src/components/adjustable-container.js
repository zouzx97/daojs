import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 30; // px
const marginX = 10; // px
const marginY = 10; // px

export default class AdjustableContainer extends React.PureComponent {
  render() {
    return (
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{ lg: this.props.layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={rowHeight}
        margin={[marginX, marginY]}
        // onDrag={args => this.onLayoutChange(args)}
        // onResize={args => this.onLayoutChange(args)}
        // onDragStop={args => this.saveLayout(args)}
        // onResizeStop={args => this.saveLayout(args)}
      >
        {this.props.children}
      </ResponsiveReactGridLayout>
    );
  }
}

AdjustableContainer.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

AdjustableContainer.defaultProps = {
  layout: [],
};
