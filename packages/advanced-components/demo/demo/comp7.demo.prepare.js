
import React from 'react';
import moment from 'moment';
import { Icon, Tooltip } from 'antd';
import styles from './comp7.demo.less';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const Yuan = ({ children }) => (
  <span dangerouslySetInnerHTML={{ __html: `￥${children}` }} /> /* eslint-disable-line react/no-danger */
);

const Trend = ({ flag, children, ...rest }) => {
  return (
    <div {...rest} className={styles.trendItem} title={typeof children === 'string' ? children : ''}>
      <span className={styles.value}>{children}</span>
      {flag && (
        <span className={styles[flag]}>
          <Icon type={`caret-${flag}`} />
        </span>
      )}
    </div>
  );
};

const Field = ({ label, value, ...rest }) => (
  <div className={styles.field} {...rest}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const action = (
  <Tooltip title="指标说明">
    <Icon type="info-circle-o" />
  </Tooltip>
);

const Cell = (props) => {
  return (
    <div style={{ width: '300px', height: '200px', margin: '20px' }} >
      {props.children}
    </div>
  );
};

export {
  Yuan,
  Trend,
  Field,
  visitData,
  action,
  Cell,
};
