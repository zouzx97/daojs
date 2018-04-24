import React, { PureComponent } from 'react';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';

import Cell from '../cell';
import StoryboardContext from '../storyboard-context';

const directionMap = {
  vertical: 'column',
  horizontal: 'row',
};

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
};

export default class FlexboxContainer extends PureComponent {
  render() {
    const {
      direction,
      align,
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          ...this.props.style,
          flexDirection: directionMap[direction] || 'row',
          justifyContent: alignMap[align] || align,
        }}
      >
        <StoryboardContext.Consumer>
          { ({ agent }) => _.map(this.props.items, (item) => {
            const {
              id,
              props = {},
            } = item;
            const { width, height, flex } = props;
            return (
              <div style={{ width, height, flex }} key={id}>
                <Cell agent={agent} {...item} />
              </div>
            );
          })}
        </StoryboardContext.Consumer>
      </div>
    );
  }
}

FlexboxContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.objectOf(any),
    PropTypes.string,
  ])),
  style: PropTypes.objectOf(any),
  direction: PropTypes.string,
  align: PropTypes.string,
};

FlexboxContainer.defaultProps = {
  items: [],
  style: {},
  direction: 'horizontal',
  align: 'start',
};
