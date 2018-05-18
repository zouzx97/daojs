import React from 'react';
import builtinComponents from '@daojs/builtin-components';
import { Comp7 as ChartCard } from '@daojs/advanced-components';
import { Yuan, Trend, Field, visitData, action, Cell } from './comp7.demo.prepare';
import styles from './comp7.demo.less';

const {
  GridLayout, MiniArea, MiniProgress,
} = builtinComponents;

export default function Comp7Demo() {
  return (
    <GridLayout>
      <Cell>
        <ChartCard
          bordered={false}
          title="总销售额"
          action={action}
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
      </Cell>
      <Cell>
        <ChartCard
          bordered={false}
          title="访问量"
          action={action}
          total="8,846"
          footer={<Field label="日访问量" value="1,234" />}
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData} />
        </ChartCard>
      </Cell>
      <Cell>
        <ChartCard
          bordered={false}
          title="运营活动效果"
          action={action}
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
      </Cell>
    </GridLayout>
  );
}
