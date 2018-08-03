import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
//import _ from 'lodash';

function ShowChart(props) {
  if (!props.flag) return null;
  return props.chart;
}
export default class Table extends PureComponent {
  static propTypes = {
    col: PropTypes.number.isRequired,
    cells: PropTypes.arrayOf(PropTypes.func).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      chartState: _.map(new Array(this.props.cells.length), () => false),
      allState: true,
      width: 24 / this.props.col,
    };
    this.chartClick = this.chartClick.bind(this);
  }
  chartClick(e) {
    const id = e.currentTarget.dataset.id;
    this.setState(prevState => ({
      allState: !prevState.allState,
      width: prevState.allState ? prevState.width * this.props.col : prevState.width / this.props.col,
      chartState: prevState.chartState.map((item, key) => (
        key == id ? !item : item
      )),
    }));
  }
  render() {
    const { cells } = this.props;
    const newCells = _.map(cells, (item, key) => (
      <Col span={this.state.width}>
        <div onClick={this.chartClick} data-id={key}>
          {item()}
        </div>
      </Col>
    ));
    const newNewCells = newCells.map((item, key) => (
      <ShowChart flag={this.state.chartState[key] || this.state.allState} chart={item}/>
    ));
    return (
      <div>
        <Row>
          {newNewCells}
        </Row>
      </div>
    );
  }
}
