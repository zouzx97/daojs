import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card } from 'antd';

export default class CardContainer extends PureComponent {
  render() {
    const {
      title,
      renderItems,
      renderExtras,
      ...otherProps
    } = this.props;

    const extras = (
      <span
        role="presentation"
        onMouseDown={(e) => { e.stopPropagation(); }}
        onMouseUp={(e) => { e.stopPropagation(); }}
      >
        {renderExtras()}
      </span>
    );
    return (
      <div
        {...otherProps}
      >
        <Card
          title={title}
          extra={extras}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'move',
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
            {renderItems()}
          </div>
        </Card>
      </div>
    );
  }
}

CardContainer.propTypes = {
  title: PropTypes.string,
  renderItems: PropTypes.func,
  renderExtras: PropTypes.func,
};

CardContainer.defaultProps = {
  title: '',
  renderItems: _.noop,
  renderExtras: _.noop,
};
