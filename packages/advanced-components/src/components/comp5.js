import React from 'react';
import _ from 'lodash';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';

const padding = 15; // px

export default function Comp5(props) {
  const {
    title,
    subTitle,
    icon,
    footer,
  } = props;

  return (
    <div className="card5">
      <ThemeContext.Consumer>
        {({ primaryColor }) => (
          <ContainerDimensions>
            { ({ width, height }) => {
            const titleSize = _.round(width / 13);
            const subTitleSize = _.round(width / 20);

            return (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: primaryColor,
                borderRadius: '5px',
                padding: `${padding}px`,
              }}
              >
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <Icon type={icon} style={{ fontSize: `${_.round(titleSize * 3)}px`, color: 'rgba(255, 255, 255, 0.9)' }} />
                </div>
                <div style={{
                  flex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  marginLeft: `${titleSize}px`,
                }}
                >
                  <div style={{
                    flex: 4,
                    display: 'flex',
                    alignItems: 'flex-end',
                    color: 'rgba(255, 255, 255, 1)',
                    fontSize: titleSize,
                  }}
                  >
                    { title }
                  </div>
                  <div style={{
                    flex: 3,
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: subTitleSize,
                    alignItems: 'flex-start',
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

