import React from 'react';
import PropTypes, { any } from 'prop-types';
import Promise from 'bluebird';
import { Spin } from 'antd';
import ComponentRegistry from './component-registry';

Promise.config({
  cancellation: true,
});

export default class Cell extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type === prevState.type) {
      return null;
    }

    return {
      data: null,
      isLoadingData: Boolean(nextProps.input),

      Control: null,
      isLoadingControl: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoadingData: true,
      Control: null,
      isLoadingControl: true,
    };
    this.loadData();
    this.loadControl();
  }

  componentDidMount() {
    if (this.props.input) {
      this.props.agent.on(`cn-invalidate:${this.props.input}`, this.invalidate);
    }
  }

  componentDidUpdate() {
    const { isLoadingData, isLoadingControl } = this.state;

    if (isLoadingData) {
      this.loadData();
    }

    if (isLoadingControl) {
      this.loadControl();
    }
  }

  componentWillUnmount() {
    // Cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    if (this.loadControlPromise) {
      this.loadControlPromise.cancel();
    }
    if (this.loadDataPromise) {
      this.loadDataPromise.cancel();
    }

    if (this.props.input) {
      this.props.agent.off(`cn-invalidate:${this.props.input}`, this.invalidate);
    }
  }

  invalidate = () => {
    this.setState(() => ({ isLoadingData: true }));
    this.loadData();
  }

  loadControl = () => {
    const { type } = this.props;
    const loadControlPromise = Promise.resolve(type ? ComponentRegistry.get(type) : null);

    this.loadControlPromise = loadControlPromise;
    this.loadControlPromise.then((Control) => {
      if (this.loadControlPromise === loadControlPromise) {
        this.setState(({ Control, isLoadingControl: false }));
      }
    });
  }

  loadData = () => {
    const { agent, input } = this.props;
    const loadDataPromise = Promise.resolve(input ? agent.call('get', input) : null);

    this.loadDataPromise = loadDataPromise;
    loadDataPromise.then((data) => {
      if (this.loadDataPromise === loadDataPromise) {
        this.setState({ data, isLoadingData: false });
      }
    });
  }

  updateData = (value) => {
    if (this.props.output) {
      this.props.agent.call('set', this.props.output, value);
    }
  }

  render() {
    const {
      id,
      props,
    } = this.props;

    const {
      Control,
      data,
      isLoadingData,
      isLoadingControl,
    } = this.state;

    if (isLoadingData || isLoadingControl) {
      return <Spin />;
    }
    return (
      <Control id={id} {...props} {...data} update={this.updateData} />
    );
  }
}

Cell.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  props: PropTypes.objectOf(any),
  agent: PropTypes.objectOf(any).isRequired,
  input: PropTypes.string,
  output: PropTypes.string,
};

Cell.defaultProps = {
  input: undefined,
  output: undefined,
  props: {},
};
