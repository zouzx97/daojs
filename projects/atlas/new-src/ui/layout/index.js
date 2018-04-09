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
      type = config,
      props = {},
      items = [],
    } = config;

    return (
      <div key={key}>
        <Cell
          id={key}
          input={input}
          output={output}
          type={type}
          data={this.props.data.get(input)}
          isUpdating={this.props.isUpdating.get(input)}
          update={this.props.update}
          {...props}
        >
          {_.map(items, item => this.renderItem(item))}
        </Cell>
      </div>
    );
  }
  render() {
    const { layout } = this.props;
    return this.renderItem(layout);
  }
}

Layout.propTypes = {
  layout: PropTypes.objectOf(any).isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
  isUpdating: PropTypes.instanceOf(Map).isRequired,
  update: PropTypes.func.isRequired,
};
