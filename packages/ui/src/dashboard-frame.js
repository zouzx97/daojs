import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Storyboard from './storyboard';

const { Header, Content } = Layout;

const contentStyle = {
  background: '#f0f2f5',
  padding: 24,
};

export default function DashboardFrame(props) {
  const {
    logoImage,
    logo = logoImage,
    title,
    story,
  } = props;

  return (
    <Layout className="dao-dashboard-frame">
      <Header className="header">
        <div style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          height: '100%',
          width: '100px',
          backgroundImage: `url(${logo})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
        />
        <h3 style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          color: '#eee',
        }}
        >
          { title }
        </h3>
      </Header>
      <Content style={contentStyle}>
        <Storyboard story={story} engine="dist/engine.js" />
      </Content>
    </Layout>
  );
}
