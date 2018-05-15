import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Storyboard from './storyboard';
import './style/dashboard-frame.css';

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
      <Header className="header dashboard-header">
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
          color: 'gray',
          fontFamily: '微软雅黑',
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
