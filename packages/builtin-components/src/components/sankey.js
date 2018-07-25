import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Sankey extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
    sliceKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { source, sliceKey } = this.props;
    validate(source);
    validate(sliceKey);

    const newSource = _.zip(...(_.map(sliceKey, key => [key, ..._.map(source, key)])));

    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: {
        type: 'sankey',
        layout: 'none',
        data: _.chain(_.zip(...newSource))
          .slice(0, 2)
          .map(column => column.slice(1))
          .flatten()
          .uniq()
          .map(name => ({ name }))
          .value(),
        links: _.chain(newSource)
          .slice(1)
          .map(row => ({
            source: row[0],
            target: row[1],
            value: row[2],
          }))
          .value(),
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
