import React from 'react';
import moment from 'moment';
import { Icon, Tooltip } from 'antd';
import builtinComponents from '@daojs/builtin-components';
import { Comp7 as ChartCard } from '@daojs/advanced-components';
import styles from './comp7.demo.less';

const {
  GridLayout, MiniArea, MiniBar, MiniProgress,
} = builtinComponents;

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

export default function Comp7Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <ChartCard
          bordered={false}
          title="总销售额"
          action={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
              }
          total={() => <Yuan>126,560</Yuan>}
          footer={<Field label="日均销售额" value="￥12,435" />}
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
              周同比<span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
              日环比<span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <ChartCard
          bordered={false}
          title="访问量"
          action={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
              }
          total="8,846"
          footer={<Field label="日访问量" value="1,234" />}
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData} />
        </ChartCard>
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <ChartCard
          bordered={false}
          title="运营活动效果"
          action={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="78%"
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', display: 'flex' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <div style={{ border: '1px solid #eee'} }>
            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
          </div>
        </ChartCard>
      </div>
    </GridLayout>
  );
}
