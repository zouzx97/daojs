import React from 'react';
import _ from 'lodash';
import { Table } from 'antd';
// import PropTypes from 'prop-types';

export default function Weather(props) {
  const columns = [{
    title: '日期',
    key: 'date',
    dataIndex: 'date',
  }, {
    title: '天气',
    key: 'weather',
    render: (text, record) => {
      const {
        text_day, code_day, text_night, code_night,
      } = record;
      return (
        <span>
          白天: <img style={{width: '45px'}} src={`img/weather/${code_day}.png`} alt={text_day} />
          <br />
          夜里: <img style={{width: '45px'}} src={`img/weather/${code_night}.png`} alt={text_night} />
        </span>
      );
    },
  }, {
    title: '温度',
    key: 'temp',
    render: (text, record) => {
      const { high, low } = record;
      return <span>{low}&#8451; - {high}&#8451;</span>;
    },
  }];

  const data = _.get(props, 'results[0].daily');

  return (
    <Table
      pagination={false}
      bordered={true}
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
