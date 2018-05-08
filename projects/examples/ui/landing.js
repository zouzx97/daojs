import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Layout, Card, Col, Row, Button, Icon } from 'antd';
import _ from 'lodash';

const Landing = ({ examples }) => (
  <Layout style={{ clear: 'both' }}>
    <Layout.Content style={{
      background: '#ECECEC',
      }}
    >
      <div style={{ padding: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 300,
          }}
        >
          Examples
        </h1>
        <p>苟利国家生死以，岂因祸福避趋之。</p>
        <Button.Group size="large">
          <Button type="primary" href="https://github.com/daojs/daojs">
            <Icon type="github" />
            Star
          </Button>
          <Button href="https://github.com/daojs/daojs">
            <Icon type="caret-right" />
            Get started!
          </Button>
        </Button.Group>
      </div>
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row gutter={16}>
          {_.map(examples, example => (
            <Col span={4} key={example.name}>
              <Link to={`/${example.name}`} >
                <Card
                  hoverable
                  cover={<img alt="example" src={example.coverImage} />}
                >
                  <Card.Meta
                    title={example.name}
                    description={example.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Layout.Content>
  </Layout>
);

Landing.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Landing;
