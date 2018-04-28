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
      condition: true,
      isLoadingCondition: Boolean(nextProps.condition),

      Control: null,
      isLoadingControl: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoadingData: true,
      condition: true,
      isLoadingCondition: true,
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
    if (this.props.condition) {
      this.props.agent.on(`cn-invalidate:${this.props.condition}`, this.invalidateCondition);
    }
  }

  componentDidUpdate() {
    const { isLoadingData, isLoadingCondition, isLoadingControl } = this.state;

    if (isLoadingData) {
      this.loadData();
    }

    if (isLoadingCondition) {
      this.loadCondition();
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
    // if (this.props.condition) {
    //   this.props.agent.off(`cn-invalidate:${this.props.condition}`, this.invalidateCondition);
    // }
  }

  invalidate = () => {
    this.setState(() => ({ isLoadingData: true }));
    this.loadData();
  }

  invalidateCondition = () => {
    this.setState(() => ({ isLoadingCondition: true }));
    this.loadCondition();
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

  loadCondition = () => {
    const { agent, condition } = this.props;

    const loadConditionPromise = Promise.resolve(condition ? agent.call('get', condition) : true);

    this.loadConditionPromise = loadConditionPromise;
    loadConditionPromise.then((data) => {
      if (this.loadConditionPromise === loadConditionPromise) {
        this.setState({ condition: data, isLoadingCondition: false });
      }
    });
  }

  updateData = (value) => {
    const { output } = this.props;

    if (output) {
      if (Array.isArray(output)) {
        if (typeof value === 'object') {
          this.props.agent.call('set', value);
        }
      } else {
        this.props.agent.call('set', { [output]: value });
      }
    }
  }

  render() {
    const { props, output } = this.props;

    const {
      Control,
      condition,
      isLoadingCondition,
      data,
      isLoadingData,
      isLoadingControl,
    } = this.state;

    if (isLoadingData || isLoadingControl || isLoadingCondition) {
      return <Spin />;
    }

    if (condition && _.isNil(Control)) {
      console.warn(`Control is null for type: ${this.props.type}, you may not registry this component`); // eslint-disable-line
      return null;
    }
    return condition ? (
      <Control {...props} {...data} output={output} update={this.updateData} />
    ) : null;
  }
}

Cell.propTypes = {
  type: PropTypes.string.isRequired,
  props: PropTypes.objectOf(any),
  agent: PropTypes.objectOf(any).isRequired,
  input: PropTypes.string,
  condition: PropTypes.string,
  output: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

Cell.defaultProps = {
  input: undefined,
  condition: undefined,
  output: undefined,
  props: {},
};
