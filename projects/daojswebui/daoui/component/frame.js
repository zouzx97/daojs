import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from './header';

export default function Frame(props) {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1 }}>
        { props.children }
      </div>
    </Layout>
  );
}

Frame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

