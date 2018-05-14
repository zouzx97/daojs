import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import { Card } from 'antd';

import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

export default class CardContainer extends PureComponent {
  render() {
    const {
      actions,
      items,
    } = this.props;
    const extras = (
      <span
        role="presentation"
        onMouseDown={(e) => { e.stopPropagation(); }}
        onMouseUp={(e) => { e.stopPropagation(); }}
      >
        <StoryboardContext.Consumer>
          { ({ agent }) => _.map(actions, action => <div key={action.id} style={action.style}><Cell agent={agent} {...action} /></div>) }
        </StoryboardContext.Consumer>
      </span>
    );
    return (
      <Card
        title={this.props.title}
        extra={extras}
        style={{
          height: 'min-content',
          display: 'flex',
          flexDirection: 'column',
        }}
        bodyStyle={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          role="presentation"
          onMouseDown={(e) => { e.stopPropagation(); }}
          onMouseUp={(e) => { e.stopPropagation(); }}
          style={{
            cursor: 'initial',
            flex: 1,
          }}
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
        </div>
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
