import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card as AntdCard } from 'antd';

export default class Card extends PureComponent {
  render() {
    const {
      title,
      children,
      footer = null,
      // footer = (
      //   <div style={{ height: '20px' }}>aaaaaaaaaaaaaaa</div>
      // ),
      extras,
    } = this.props;

    const extras = (
      <span
        role="presentation"
        onMouseDown={(e) => { e.stopPropagation(); }}
        onMouseUp={(e) => { e.stopPropagation(); }}
      >
        {extras}
      </span>
    );
    return (
      <AntdCard
        title={title}
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
          {children}
          {footer && (
            <div
              style={{
                borderTop: '1px solid #e8e8e8',
                paddingTop: '9px',
                // marginTop: '8px',
                marginTop: '20px',
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </AntdCard>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  extras: PropTypes.element,
};

Card.defaultProps = {
  title: '',
  children: null,
  extras: null,
};
