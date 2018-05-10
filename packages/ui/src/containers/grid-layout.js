import _ from 'lodash';
import React from 'react';
import { Row, Col } from 'antd';
import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

const ROW_PROPS = ['align', 'gutter', 'justify', 'type'];
const COL_PROPS = ['offset', 'order', 'pull', 'push', 'span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const STYLE = ['height', 'padding'];

class GridRow extends React.PureComponent {
  render() {
    return (
      <Row
        {..._.pick(this.props, ROW_PROPS)}
        gutter={30}
        style={{
          ..._.pick(this.props, STYLE),
        }}
      >
        {_.map(this.props.children, (child, i) => (
          <Col {..._.pick(this.props.cols[i], COL_PROPS)} key={this.props.cols[i].id}>
            <div
              style={{
                ..._.pick(this.props.cols[i], STYLE),
              }}
            >
              {child}
            </div>
          </Col>))}
      </Row>
    );
  }
}

export default function GridLayout(props) {
  const { rows } = props;

  return (
    <div>
      <StoryboardContext.Consumer>
        {
          ({ agent }) => _.map(rows, (row, rowIndex) =>
            (
              <Cell
                type={GridRow}
                agent={agent}
                condition={row.condition}
                props={row}
                key={row.id || rowIndex}
              >
                {
                  _.map(row.cols, (col, colIndex) => (
                    <Cell
                      agent={agent}
                      condition={col.condition}
                      {...col.content}
                      key={col.id || colIndex}
                    />
                  ))
                }
              </Cell>
            ))
        }
      </StoryboardContext.Consumer>
    </div>
  );
}
