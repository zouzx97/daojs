import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

export default function CustomizeDishes(props) {
  return (
    <Row
      gutter={24}
    >
      {_.map(props.recommendations, (item, index) => (
        <Col
          key={index}
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={6}
          xxl={4}
          key={item.id}
          style={{
            marginTop: '10px',
          }}
        >
          <img style={{ width: '100%' }} src={item.img} alt={item.alt} />
          <div
            style={{
              fontFamily: 'Microsoft Yahei',
              padding: '5px',
              background: 'white',
            }}
          >
            <span
              style={{
                color: '#333',
                fontSize: '18px',
              }}
            >
              {item.name}
            </span>
            <div
              style={{
                color: '#999',
                fontSize: '12px',
              }}
            >
              <span>Taste: {item.taste}</span>
              <br />
              <span>Price: {item.price}</span>
            </div>
          </div>
          { item.tag ? (
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                position: 'absolute',
                top: '12px',
                right: '-3px',
                background: '#60a531',
                color: 'white',
                padding: '0px 10px',
                lineHeight: '32px',
                fontSize: '14px',
              }}
            >
              <span>{item.tag}</span>
            </div>) : null}
        </Col>))}
    </Row>
  );
}

CustomizeDishes.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
};

CustomizeDishes.defaultProps = {
  recommendations: [],
};
