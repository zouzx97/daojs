import React from 'react';
import _ from 'lodash';
import { Table, Icon, Divider } from 'antd';
// import PropTypes from 'prop-types';

export default function Weather(props) {
  const columns = [{
    titlle: 'Date',
    key: 'date',
    dataIndex: 'date',
  }, {
    title: 'Weather',
    key: 'weather',
    render: (text, record) => {
      const { text_day, high, low } = record;
      return <span>{text_day} - {high} - {low}</span>;
    },
  }];

  const data = _.get(props, 'results[0].daily');

  return (
    <Table
      columns={columns}
      dataSource={data}
    />
  );
}

Weather.propTypes = {
  // recommendations: PropTypes.arrayOf(PropTypes.object),
};

Weather.defaultProps = {
  // recommendations: [],
};
