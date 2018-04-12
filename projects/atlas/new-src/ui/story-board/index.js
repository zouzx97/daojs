import React from 'react';
import _ from 'lodash';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { WorkerAgent } from '@daojs/worker-agent';
import components from '@daojs/builtin-components';
import Registry from '@daojs/registry';
import story from './story.yaml';

const componentRegistry = new Registry().register(components);

const { LayoutDefault } = components;

function extractInputs(nodes) {
  return _.reduce(nodes, (memo, { input, items }) => {
    if (input && !_.includes(memo, input)) {
      return [...memo, ...extractInputs(items), input];
    }
    return [...memo, ...extractInputs(items)];
  }, []);
}

const agent = new WorkerAgent('dist/worker.js');
agent.register({ getStory: _.constant(story) });

export default class StoryBoard extends React.Component {
  constructor(props) {
    super(props);

    const inputs = this.inputNodes;
    this.state = {
      data: Map(),
      updating: Map(_.zipObject(inputs, _.fill(Array(inputs.length), true))),
    };
  }

  componentDidMount() {
    this.fetchData(this.inputNodes);
  }

  get inputNodes() {
    const { layout } = this.props;
    return extractInputs(_.isArray(layout) ? layout : [layout]);
  }

  fetchData = async (inputs) => {
    _.forEach(inputs, async (input) => {
      const value = await agent.call('get', input);

      this.setState(({
        data,
        updating,
      }) => ({
        data: data.set(input, value),
        updating: updating.set(input, false),
      }));
    });
  }

  update = async (key, value) => {
    const invalidateKeys = await agent.call('set', key, value);
    const invalidateNodes = _.intersection(invalidateKeys, this.inputNodes);

    this.setState(({
      data,
      updating,
    }) => ({
      data,
      updating: updating.merge(_.zipObject(invalidateNodes, _.fill(Array(invalidateNodes.length), true))), //eslint-disable-line
    }));

    this.fetchData(invalidateNodes);
  }

  render() {
    return (<LayoutDefault
      layout={this.props.layout}
      data={this.state.data}
      isUpdating={this.state.updating}
      update={this.update}
      componentRegistry={componentRegistry}
    />);
  }
}

StoryBoard.propTypes = {
  layout: PropTypes.objectOf(PropTypes.any).isRequired,
};
