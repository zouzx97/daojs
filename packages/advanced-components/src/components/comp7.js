import React from 'react';
import constant from 'lodash/constant';
import PropTypes from 'prop-types';
import { Card, Spin } from 'antd';
import 'antd/lib/style/themes/default.less';

import styles from './comp7.less';

const totalStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  whiteSpace: 'nowrap',
  // color: '#eee',
  marginTop: '4px',
  marginBottom: 0,
  fontSize: '30px',
  lineHeight: '38px',
  height: '38px',
};

const renderTotal = (total) => {
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className={styles.total} style={totalStyle}>{total()}</div>;
      break;
    default:
      totalDom = <div className={styles.total} style={totalStyle}>{total}</div>;
  }
  return totalDom;
};

const ChartCard = ({
  loading = false,
  contentHeight,
  title,
  avatar,
  action,
  total,
  footer,
  children,
  ...rest
}) => {
  const content = (
    <div className={styles.chartCard} style={{ position: 'relative' }}>
      <div
        className={styles.chartTop}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div className={styles.avatar}>{avatar}</div>
        <div className={styles.metaWrap}>
          <div className={styles.meta}>
            <span className={styles.title}>{title}</span>
            <span
              className={styles.action}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                right: 0,
            }}
            >
              {action}
            </span>
          </div>
          {renderTotal(total)}
        </div>
      </div>
      {children && (
        <div
          className={styles.content}
          style={{
            height: contentHeight || 'auto',
            marginBottom: '12px',
            position: 'relative',
            width: '100%',

            }}
        >
          <div
            className={contentHeight && styles.contentFixed}
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
            }}
          >
            {children}
          </div>
        </div>
      )}
      {footer && (
        <div
          className={styles.footer}
          style={{
            borderTop: '1px solid #eee',
            paddingTop: '9px',
            marginTop: '8px',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );

  return (
    <Card bodyStyle={{ padding: '20px 24px 8px 24px', border: '2px solid #eee' }} {...rest}>
      {
        <Spin spinning={loading} wrapperClassName={styles.spin}>
          {content}
        </Spin>
      }
    </Card>
  );
};

ChartCard.propTypes = {
  loading: PropTypes.bool,
  contentHeight: PropTypes.number,
  title: PropTypes.string,
  avatar: PropTypes.element,
  action: PropTypes.element,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

ChartCard.defaultProps = {
  loading: false,
  contentHeight: 'auto',
  title: '',
  avatar: null,
  action: null,
  total: constant(null),
  footer: null,
  children: null,
};

export default ChartCard;
