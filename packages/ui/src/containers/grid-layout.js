import _ from 'lodash';
import React from 'react';
import { Row, Col } from 'antd';
import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

const ROW_PROPS = ['align', 'gutter', 'justify', 'type'];
const COL_PROPS = ['offset', 'order', 'pull', 'push', 'span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export default function GridLayout(props) {
  const { rows } = props;

  return (
    <div>
      {
        _.map(rows, row => (
          <Row {..._.pick(row, ROW_PROPS)} key={row.id}>
            {
              _.map(row.cols, col => (
                <Col {..._.pick(col, COL_PROPS)} key={col.id}>
                  <StoryboardContext.Consumer>
                    {({ agent }) => <Cell agent={agent} {...col.content} />}
                  </StoryboardContext.Consumer>
                </Col>
              ))
            }
          </Row>
      ))
      }
    </div>
  );
}
