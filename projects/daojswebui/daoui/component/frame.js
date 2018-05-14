import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from './header';

export default function Frame(props) {
  return (
    <Layout style={{
      minHeight: '100vh',
      maxHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <Header />
      { props.children }
    </Layout>
  );
}

Frame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

