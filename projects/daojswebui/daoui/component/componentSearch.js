import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

export default class ComponentSearch extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  onSearch = (event) => {
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <Search
        placeholder="Filter"
        enterButton={false}
        onKeyUp={this.onSearch}
        style={{
          display: 'inline-grid',
          marginBottom: '1em',
        }}
      />
    );
  }
}
