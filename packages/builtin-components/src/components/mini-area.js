import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import { ThemeContext } from '@daojs/contexts';
import autoHeight from '../utils/auto-height';
import styles from '../styles/antd.charts.less';

@autoHeight()
export default class MiniArea extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        { () => {
          const {
            height, // eslint-disable-line react/prop-types
            data = [], // eslint-disable-line react/prop-types
            forceFit = true, // eslint-disable-line react/prop-types
            color = 'rgba(255, 255, 255, 0.6)', // eslint-disable-line react/prop-types
            borderColor = 'rgba(255,255,255,1)', // eslint-disable-line react/prop-types
            scale = {}, // eslint-disable-line react/prop-types
            borderWidth = 2, // eslint-disable-line react/prop-types
            line, // eslint-disable-line react/prop-types
            xAxis, // eslint-disable-line react/prop-types
            yAxis, // eslint-disable-line react/prop-types
            animate = true, // eslint-disable-line react/prop-types
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
            </div>);
        }}
      </ThemeContext.Consumer>
    );
  }
}
