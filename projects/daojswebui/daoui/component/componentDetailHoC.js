import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ComponentDetail from './componentDetail';
import { getComponent } from '../repository';
import { MODE } from '../constants';

export default class ComponentDetailHoC extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.name === prevState.name) {
      return null;
    }
    return {
      name: nextProps.name,
      data: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      data: null,
    };
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { name, data } = this.state;
    if (!_.isNull(data) || _.isEmpty(name)) {
      return;
    }
    if (MODE === 'server') {
      Promise.all([
        getComponent({ name }),
        getComponent({ name: `${name}/demo` }),
      ]).then(([
        { data: self },
        { data: demo },
      ]) => {
        this.setState({
          data: { ...self, demo: { ...demo } },
        });
      });
    } else {
      getComponent({ name }).then(({ data: newData }) => {
        this.setState({ data: newData });
      });
    }
  }

  render() {
    return (
      _.isEmpty(this.state.data) ?
        null :
        <ComponentDetail name={this.state.name} {...this.state.data} />
    );
  }
}
