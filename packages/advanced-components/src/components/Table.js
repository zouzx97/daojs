import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
      chartState: _.times(this.props.cells.length, _.constant(false)),
      allState: true,
      width: 24 / this.props.col,
    };
    this.chartClick = this.chartClick.bind(this);
  }
  chartClick(e) {
    const { id } = e.currentTarget.dataset;
    this.setState(prevState => ({
      allState: !prevState.allState,
      width: prevState.allState ?
        prevState.width * this.props.col : prevState.width / this.props.col,
      chartState: _.map(prevState.chartState, (item, key) => (
        key.toString() === id.toString() ? !item : item
      )),
    }));
  }
  render() {
    const { cells } = this.props;
    const newCells = _.map(cells, (item, key) => (
      <Col span={this.state.width}>
        <div
          onClick={this.chartClick}
          data-id={key}
          onKeyPress={(e) => {
            if (e.keyCode === 13) {
              this.chartClick();
            }
          }}
          tabIndex="0"
          role="button"
        >
          {item()}
        </div>
      </Col>
    ));
    const newNewCells = _.map(newCells, (item, key) => (
      <ShowChart flag={this.state.chartState[key] || this.state.allState} chart={item} />
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
