import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import { ThemeContext } from '@daojs/contexts';
import autoHeight from '../utils/auto-height';
import styles from '../styles/antd.charts.less';

@autoHeight()
export default class MiniArea extends React.Component {
  render() {
    const {
      height,
      data = [],
      forceFit = true,
      color = 'rgba(24, 144, 255, 0.2)',
      borderColor = '#1089ff',
      scale = {},
      borderWidth = 2,
      line,
      xAxis,
      yAxis,
      animate = true,
    } = this.props;

    const padding = [36, 5, 30, 5];

    const scaleProps = {
      x: {
        type: 'cat',
        range: [0, 1],
        ...scale.x,
      },
      y: {
        min: 0,
        ...scale.y,
      },
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    const chartHeight = height + 30;

    return (
      <ThemeContext.Consumer>
        { ({ primaryColor }) => (
          <div className={styles.miniChart} style={{ height }}>
            <div className={styles.chartContent}>
              {height > 0 && (
              <Chart
                animate={animate}
                scale={scaleProps}
                height={chartHeight}
                forceFit={forceFit}
                data={data}
                padding={padding}
                color={primaryColor}
              >
                <Axis
                  key="axis-x"
                  name="x"
                  label={false}
                  line={false}
                  tickLine={false}
                  grid={false}
                  {...xAxis}
                />
                <Axis
                  key="axis-y"
                  name="y"
                  label={false}
                  line={false}
                  tickLine={false}
                  grid={false}
                  {...yAxis}
                />
                <Tooltip showTitle={false} crosshairs={false} />
                <Geom
                  type="area"
                  position="x*y"
                  color={color}
                  tooltip={tooltip}
                  shape="smooth"
                  style={{
                  fillOpacity: 1,
                }}
                />
                {line ? (
                  <Geom
                    type="line"
                    position="x*y"
                    shape="smooth"
                    color={borderColor}
                    size={borderWidth}
                    tooltip={false}
                  />
              ) : (
                <span style={{ display: 'none' }} />
              )}
              </Chart>
          )}
            </div>
          </div>)
        }
      </ThemeContext.Consumer>
    );
  }
}
