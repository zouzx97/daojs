import React from 'react';
import PropType from 'prop-types';
import { Layout } from 'antd';

const {
  Content, Sider,
} = Layout;

const styles = {
  bg: {
    background: '#f0f2f5',
  },
};

export default function HomeLayout(props) {
  const {
    LeftComp, RightComp,
  } = props;

  return (
    <Layout>
      <Sider
        trigger={null}
        width={280}
        style={{ ...styles.bg, padding: '10px' }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
          {LeftComp}
        </div>
      </Sider>
      <Content style={{ margin: '0 10px 0 0' }}>
        {RightComp}
      </Content>
    </Layout>
  );
}

HomeLayout.propTypes = {
  LeftComp: PropType.objectOf(PropType.any).isRequired,
  RightComp: PropType.objectOf(PropType.any).isRequired,
};
