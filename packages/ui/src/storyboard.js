import React from 'react';
import _ from 'lodash';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { WorkerAgent } from '@daojs/worker-agent';

export default class Storyboard extends React.Component {
  constructor(props) {
    super(props);

    const { story, engine } = props;
    const { data, layout } = story;


    this.p$client = createEngineClient(data, engine);

    this.state = {
      data: Map(),
      updating: Map(),
    };
  }

  componentDidMount() {
    this.fetchData(this.inputNodes);
  }

  p$client = createEngineClient(this.props.story, this.props.engine)

  async fetchData(keys) {
    const commit = key => value => this.setState(({ data, updating }) => ({
      data: data.set(key, value),
      updating: updating.set(key, false),
    }));
    const client = await this.p$client;
    const values = _.map(keys, key => client.get(key).tap(commit(key)));

    return _.zipObject(keys, await Promise.all(values));
  }

  update = async (key, value) => {
    const client = this.p$client.set(key, value);
  }

  update = async (key, value) => {
    const invalidateKeys = await client.call('set', key, value);
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
    return (<Layout
      layout={this.props.layout}
      data={this.state.data}
      isUpdating={this.state.updating}
      update={this.update}
    />);
  }
}

Storyboard.propTypes = {
  story: PropTypes.shape({
    name: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.object,
  }).isRequired,
  engine: PropTypes.string,
};

Storyboard.defaultProps = {
  engine: './engine.js',
};
