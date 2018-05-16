import React from 'react';
import _ from 'lodash';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import Donut from './donut';

const padding = 15; // px

export default function Comp1(props) {
  const {
    title,
    subTitle,
    percent,
  } = props;

  const chartSource = [
    { part: 1, value: percent },
    { part: 2, value: 100 - percent },
  ];

  // const primaryColor = '#5fbeaa';
  const secondaryColor = '#98A6AE';
  const backgroundColor = '#353F49';

  return (
    <ThemeContext.Consumer>
      {({ primaryColor }) => (
        <ContainerDimensions>
          { ({ width, height }) => {
            console.log(height);
            const chartHeight = height - (2 * padding);
            const titleSize = _.round(width / 13);
            const subTitleSize = _.round(width / 20);

            return (
              <div style={{
                width: '100%',
                height: '100%',
                padding: `${padding}px`,
                display: 'flex',
                backgroundColor,
              }}
              >
                <div style={{ flex: 1 }}>
                  <Donut
                    hasLegend={false}
                    title={`${percent}%`}
                    titleStyle={{
                      color: secondaryColor,
                      fontSize: subTitleSize,
                    }}
                    source={chartSource}
                    style={{
                      height: chartHeight,
                      backgroundColor,
                    }}
                    restColors={[secondaryColor]}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    color: primaryColor,
                    flex: 1,
                    fontSize: `${titleSize}px`,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      { title }
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    textAlign: 'right',
                    color: secondaryColor,
                    fontSize: `${subTitleSize}px`,
                  }}
                  >
                    { subTitle }
                  </div>
                </div>
              </div>
            );
          }}
        </ContainerDimensions>
        )
      }
    </ThemeContext.Consumer>


  );
}

