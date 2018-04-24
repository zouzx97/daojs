import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Prediction } from '@daojs/botana-components';

export default function RecommendationNewDishes(props) {
  return (
    <div>
      <Row>
        <Col>
          Name:
        </Col>
        <Col>{props.name}</Col>
        <Col>
          Taste:
        </Col>
        <Col>{props.taste}</Col>
        <Col>
          Price:
        </Col>
        <Col>{props.price}</Col>
      </Row>
      <Row>
        <Col>
          <Prediction source={props.predication} />
        </Col>
      </Row>
    </div>
  );
}

RecommendationNewDishes.propTypes = {
  name: PropTypes.string.isRequired,
  taste: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  predication: PropTypes.arrayOf(PropTypes.object),
};

RecommendationNewDishes.defaultProps = {
  predication: [],
};
