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
    if (this.props.type) {
      const loadControlPromise = Promise.resolve(ComponentRegistry.get(this.props.type));
      this.loadControlPromise = loadControlPromise;
      this.loadControlPromise.then((Control) => {
        if (this.loadControlPromise === loadControlPromise) {
          this.setState(({ Control, isLoadingControl: false }));
        }
      });
    } else {
      this.setState({ isLoadingControl: false });
    }
  }

  loadData = () => {
    if (this.props.input) {
      const loadDataPromise = Promise.resolve(this.props.agent.call('get', this.props.input));

      this.loadDataPromise = loadDataPromise;
      loadDataPromise.then((data) => {
        if (this.loadDataPromise === loadDataPromise) {
          this.setState({ data, isLoadingData: false });
        }
      });
    } else {
      this.setState({ isLoadingData: false });
    }
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

    return (
      <Spin spinning={isLoadingData || isLoadingControl}>
        { Control && <Control id={id} {...props} {...data} update={this.updateData} /> }
      </Spin>
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
