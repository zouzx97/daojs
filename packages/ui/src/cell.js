import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import { Spin } from 'antd';
import ComponentRegistry from './component-registry';

export default class Cell extends PureComponent {
  constructor(props) {
    super(props);
    const { input } = this.props;
    this.state = {
      data: null,
      isLoadingData: Boolean(input),

      Control: null,
      isLoadingControl: true,
    };

    this.loadControl();
    this.loadData();
  }

  componentDidMount() {
    if (this.props.input) {
      this.props.agent.on(`cn-invalidate:${this.props.input}`, this.invalidate);
    }
  }

  componentWillUnmount() {
    // Cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this.loadControlPromise.cancel();
    this.loadDataPromise.cancel();

    if (this.props.input) {
      this.props.agent.off(`invalidate:${this.props.input}`, this.invalidate);
    }
  }

  invalidate = () => {
    this.setState(() => ({ data: null, isLoadingData: true }));
    this.loadData();
  }

  loadControl = () => {
    this.loadControlPromise = ComponentRegistry.get(this.props.type);
    this.loadControlPromise.then((Control) => {
      this.setState(({ Control, isLoadingControl: false }));
    });
  }

  loadData = () => {
    if (this.props.input) {
      const loadDataPromise = this.props.agent.call('get', this.props.input);

      this.loadDataPromise = loadDataPromise;
      loadDataPromise.then((data) => {
        if (this.loadDataPromise === loadDataPromise) {
          this.setState({ data, isLoadingData: false });
        }
      });
    }
  }

  updateData = (value) => {
    if (this.props.output) {
      this.props.agent.set(this.props.output, value);
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
