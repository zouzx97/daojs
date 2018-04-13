import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { WorkerAgent } from '@daojs/worker-agent';
import StoryboardContext from './storyboard-context';
import Cell from './cell';

export default class Storyboard extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { story, engine } = nextProps;
    const { data, agent } = prevState;

    return {
      ...story,
      agent: data === story.data ? agent : (() => {
        if (agent) {
          agent.terminate();
        }
        return story.data ? new WorkerAgent(engine).register({
          getStory: _.constant(story.data),
        }) : null;
      })(),
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { layout, agent } = this.state;

    return agent ? (
      <StoryboardContext.Provider value={{ agent }}>
        <Cell agent={agent} {...layout} />
      </StoryboardContext.Provider>
    ) : null;
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
