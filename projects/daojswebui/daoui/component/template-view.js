import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Layout } from 'antd';
import { frameMapper } from '../frameMapper';
import ComponentRegistry from '../../components-registry';

const { Header, Content } = Layout;

class TemplateView extends React.PureComponent {
  render() {
    const {
      routeName,
      id,
      frameType = 'AppFrame',
    } = this.props;

    const Frame = frameMapper[frameType];
    const props = _.omit(this.props, ['frameType', 'routeName', 'id']);

    const content = (<Frame
      {...props}
      componentRegistry={ComponentRegistry}
    />);

    return (
      <Layout style={{ clear: 'both' }}>
        <Header
          style={{
            paddingTop: '15px',
            background: 'white',
          }}
        >
          <Button
            type="primary"
            href={`#/templates/${routeName}/config`}
            style={{
              marginRight: '20px',
            }}
          >
            View
          </Button>
          <Button
            href={`#/templates/${routeName}/editor`}
            style={{
              background: '#4CAF50',
              color: 'white',
            }}
          >
            Copy & Try online >>
          </Button>
        </Header>
        <Content>
          {content}
        </Content>
      </Layout>
    );
  }
}


TemplateView.propTypes = {
  routeName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  frameType: PropTypes.string.isRequired,
};

export default TemplateView;
