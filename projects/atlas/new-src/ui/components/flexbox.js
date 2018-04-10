import React, { PureComponent } from 'react';
import { Grid, Row, Col, getRowProps, getColumnProps } from 'react-flexbox-grid';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';

export default class FlexBox extends PureComponent {
  render() {
    const { flexDirection } = this.props.layout;
    if (flexDirection === 'vertical') {
      return (
        <Grid fluid>
          {_.map(this.props.children, child =>
            (
              <Row key={child.key} {...getRowProps(child.props.layout)}>
                <Col {...getColumnProps(child.props.layout)}>{child}</Col>
              </Row>))}
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
  layout: PropTypes.objectOf(any),
};

FlexBox.defaultProps = {
  children: [],
  layout: {},
};
