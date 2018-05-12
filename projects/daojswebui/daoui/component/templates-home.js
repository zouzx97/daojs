import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Layout, Card, Col, Row, Button, Icon, Input, Form } from 'antd';
import _ from 'lodash';

class TemplatesHome extends React.Component {
  constructor(props) {
    super(props);

    this.examples = props.examples;
  }

  handleSearch() {
  }

  renderCatetories() {
    return (
      <Row>
        <Col span={6} />
        <Col span={12}>
          <Card title="餐饮类解决方案" bordered={false} extra={<Button href="#">了解更多</Button>}>
            <Row gutter={16}>
              {_.map(this.examples, example => (
                <Col span={8} key={example.name}>
                  <Link to={`templates/${example.name}`} >
                    <Card
                      hoverable
                      cover={<img alt="example" src={example.coverImage} />}
                      bordered={false}
                    >
                      <Card.Meta
                        title={example.name}
                        description={example.description}
                        bordered={false}
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={16} />
      </Row>
    );
  }

  render() {
    return (
      <Layout style={{ clear: 'both' }}>
        <Layout.Content >
          <div
            style={
              {
                background: '#fff',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingRight: '15px',
                paddingLeft: '15px',
                width: '100%',
              }
            }
          >
            <div align="center" style={{ padding: '20px' }}>
              <img
                src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png"
                srcSet="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png 1x, https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack@2x.png 2x" 
                alt="Dao"
              />
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 300,
                }}
              >
                Build anything
              </h1>
              <Button.Group size="large">
                <Button type="primary" href="https://github.com/daojs/daojs">
                  <Icon type="github" />
                  为我们点赞
                </Button>
                <Button href="https://github.com/daojs/daojs">
                  <Icon type="caret-right" />
                  Get started!
                </Button>
                <Input.Search placeholder="搜索" style={{ height: '38px', width: '200px' }} />
              </Button.Group>
            </div>
            { this.renderCatetories() }
            { this.renderCatetories() }
            { this.renderCatetories() }
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

TemplatesHome.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TemplatesHome;
