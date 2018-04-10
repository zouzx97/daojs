import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Map } from 'immutable';
import _ from 'lodash';
import Cell from '../components/cell';

export default class Layout extends React.PureComponent {
  renderItem(config) {
    const {
      key = config,
      input = _.isString(config) ? config : undefined,
      output,
      type = _.isString(config) ? config : 'Flexbox',
      items = [],
      layout = {},
      ...otherProps
    } = config;

    return (
      <div key={key} layout={layout}>
        <Cell
          id={key}
          input={input}
          output={output}
          type={type}
          data={this.props.data.get(input)}
          isUpdating={this.props.isUpdating.get(input)}
          update={this.props.update}
          {...otherProps}
        >
          {_.map(items, item => this.renderItem(item))}
        </Cell>
      </div>
    );
  }
  render() {
    return this.renderItem(this.props.layout);
  }
}

Layout.propTypes = {
  layout: PropTypes.objectOf(any).isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
  isUpdating: PropTypes.instanceOf(Map).isRequired,
  update: PropTypes.func.isRequired,
};
