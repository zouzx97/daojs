import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import builtinComponents from '@daojs/builtin-components/src/index';

const {
  Bar, Donut, Line,
} = builtinComponents;

const dict = {
  line: function buildChart(source, dimension, metric, onClick) {
    return (<Line
      source={source}
      axisDimensions={dimension}
      metricDimensions={metric}
      onEvents={{ click: onClick }}
    />);
  },
  bar: function buildChart(source, dimension, metric, onClick) {
    return (<Bar
      source={source}
      isHorizontal={false}
      axisDimensions={dimension}
      metricDimensions={metric}
      onEvents={{ click: onClick }}
    />);
  },
  donut: function buildChart(source, dimension, metric, onClick) {
    return (<Donut
      title={metric}
      subTitle=""
      source={source}
      onEvents={{ click: onClick }}
    />);
  },
};
export default class relativeCharts extends PureComponent {
  static propTypes = {
    charts: PropTypes.arrayOf(PropTypes.object).isRequired,
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      dimension: '',
    };
  }
  render() {
    const { charts, source } = this.props;
    const chart0 = charts[0];
    const chart1 = charts[1];
    const source0 = _.groupBy(source, chart0.dimension);
    const dimension0 = Object.getOwnPropertyNames(source0);
    const finalSource0 = _.map(dimension0, item => ({
      [chart0.dimension]: item,
      [chart0.metric]: source0[item].length,
    }));
    const source1 = _.groupBy(_.filter(
      source,
      [chart0.dimension,
        _.isNumber(source[0][chart0.dimension]) ?
          _.toNumber(this.state.dimension) : this.state.dimension,
      ],
    ), chart1.dimension);
    const dimension1 = Object.getOwnPropertyNames(source1);
    const finalSource1 = _.map(dimension1, item => ({
      [chart1.dimension]: item,
      [chart1.metric]: source1[item].length,
    }));
    return (
      <div>
        <Row>
          <Col span={12}>
            {dict[chart0.type](finalSource0, [chart0.dimension], [chart0.metric], (params) => {
              this.setState(() => ({
                dimension: params.name,
              }));
            })}
          </Col>
          <Col span={12}>
            {dict[chart1.type](finalSource1, [chart1.dimension], [chart1.metric])}
          </Col>
        </Row>
      </div>
    );
  }
}
