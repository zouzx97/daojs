import React from 'react';
import _ from 'lodash';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import Donut from './donut';

const padding = 15; // px

export default function Comp2(props) {
  const {
    title,
    subTitle,
    percent,
  } = props;

  const chartSource = [
    { part: 1, value: percent },
    { part: 2, value: 100 - percent },
  ];

  const backgroundColor = '#fff';

  return (
    <ThemeContext.Consumer>
      {({ primaryColor }) => (
        <ContainerDimensions>
          { ({ width, height }) => {
            const titleSize = _.round(width / 13);
            const subTitleSize = _.round(width / 20);
            const radius = _.min([
              (width / 2) - padding,
              (height - (2 * padding)),
            ]);

            return (
              <div style={{
                width: '100%',
                height: '100%',
                padding: `${padding}px`,
                display: 'flex',
                backgroundColor,
                border: '2px solid #eee',
                borderRadius: '5px',
              }}
              >
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <div style={{
                    width: `${radius}px`,
                    height: `${radius}px`,
                    borderRadius: `${radius}px`,
                    backgroundColor: primaryColor,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    <div style={{
                      width: `${_.round(radius * 0.8)}px`,
                      height: `${_.round(radius * 0.8)}px`,
                      borderRadius: `${_.round(radius * 0.8)}px`,
                      backgroundColor: '#fff',
                      opacity: 0.1,
                    }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    color: '#797979',
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
                    color: '#7D8B96',
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

