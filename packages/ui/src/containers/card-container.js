import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import components from '@daojs/builtin-components';

import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

const { Card } = components;

export default class CardContainer extends PureComponent {
  render() {
    const {
      actions,
      items,
    } = this.props;

    return (
      <Card
        title={this.props.title}
        extras={(
          <StoryboardContext.Consumer>
            { ({ agent }) => _.map(actions, action => <div key={action.id} style={action.style}><Cell agent={agent} {...action} /></div>) }
          </StoryboardContext.Consumer>
        )}
      >
        <StoryboardContext.Consumer>
          { ({ agent }) => _.map(items, (item) => {
            const {
              id,
              style,
            } = item;
            return <div key={id} style={style}><Cell agent={agent} {...item} /></div>;
            })
          }
        </StoryboardContext.Consumer>
      </Card>
    );
  }
}

CardContainer.propTypes = {
  actions: PropTypes.arrayOf(any),
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.objectOf(any),
    PropTypes.string,
  ])),
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(any),
};

CardContainer.defaultProps = {
  actions: [],
  items: [],
  title: '',
  className: '',
  style: {},
};
