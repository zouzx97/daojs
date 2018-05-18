import React from 'react';
import _ from 'lodash';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';
import { createDecipheriv } from 'crypto';

const padding = 15; // px

export default function Comp2(props) {
  const {
    title,
    subTitle,
    icon,
  } = props;

  const backgroundColor = '#fff';

  return (
    <div className="card2">
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
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      >
                        <Icon type={icon} style={{ fontSize: `${_.round(titleSize * 1.5)}px`, color: '#fff' }} />
                      </div>
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
    </div>
  );
}

