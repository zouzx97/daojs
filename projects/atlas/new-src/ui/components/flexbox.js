import React, { PureComponent } from 'react';
import { Grid, Row, Col, getRowProps, getColumnProps } from 'react-flexbox-grid';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';

export default class FlexBox extends PureComponent {
  render() {
    const { direction } = this.props.style;
    if (direction === 'vertical') {
      return (
        <Grid fluid>
          {_.map(this.props.children, child =>
            (<Row key={child.key} {...getRowProps(child.props.layout)}><Col>{child}</Col></Row>))}
        </Grid>
      );
    }

    return (
      <Grid fluid>
        <Row>
          {_.map(this.props.children, child =>
            (<Col key={child.key} {...getColumnProps(child.props.layout)}>{child}</Col>))}
        </Row>
      </Grid>
    );
  }
}

FlexBox.propTypes = {
  children: PropTypes.arrayOf(any),
  style: PropTypes.objectOf(any),
};

FlexBox.defaultProps = {
  children: [],
  style: {},
};
