import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { WorkerAgent } from '@daojs/worker-agent';
import StoryboardContext from './storyboard-context';
import Cell from './cell';

export default class Storyboard extends React.Component {
  constructor(props) {
    super(props);

    const { story, engine } = props;
    const { data, layout } = story;

    this.agent = new WorkerAgent(engine);
    this.agent.register({ getStory: _.constant(data) });
    this.layout = layout;
  }

  render() {
    return (
      <StoryboardContext.Provider value={{ agent: this.agent }}>
        <Cell agent={this.agent} {...this.layout} />
      </StoryboardContext.Provider>
    );
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
  engine: './dist/engine.js',
};
