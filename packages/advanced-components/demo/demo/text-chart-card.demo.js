import React from 'react';
import { Card, Row, Col } from 'antd';
import composeAdvancedComponent from '@daojs/ui/src/compose-advanced-component';
import { TextChartCard } from '@daojs/advanced-components';
import fakeData from './fakeData.demo';

export default function TextChartCardDemo() {
  const ReactTextChartCard = composeAdvancedComponent(TextChartCard);

  return (
    <div>
      <Row>
        <Col span={12}>
          <ReactTextChartCard
            title="访问量"
            text="8,846"
            chartType="Donut"
            chartData={fakeData.timeStampData}
          />
        </Col>
        <Col span={12}>
          <ReactTextChartCard
            title="访问量"
            text="8,846"
            chartType="Line"
            chartData={fakeData.timeStampData}
          />
        </Col>
        <Col span={12}>
          <ReactTextChartCard
            title="访问量"
            text="8,846"
            chartType="Bar"
            chartData={fakeData.timeStampData}
          />
        </Col>
        <Col span={12}>
          <ReactTextChartCard
            title="访问量"
            text="8,846"
            chartType="HorizontalBar"
            chartData={fakeData.timeStampData}
          />
        </Col>
      </Row>
    </div>
  );
}
