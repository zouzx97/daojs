import React from 'react';
import _ from 'lodash';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';
import MiniProgress from './mini-progress';

const padding = 15; // px

export default function Comp4(props) {
  const {
    title,
    subTitle,
    percent,
    icon,
    footer,
  } = props;

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
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: primaryColor,
                borderRadius: '5px',
                border: '2px solid #eee',
              }}
              >
                <div style={{
                  flex: 3,
                  padding: `${padding}px`,
                  paddingBottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
                >
                  <div style={{ flex: 1, color: 'rgba(255, 255, 255, 0.8)', fontSize: subTitleSize }}>
                    { subTitle }
                  </div>
                  <div style={{
                    flex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(255, 255, 255, 1)',
                    fontSize: titleSize,
                  }}
                  >
                    { title }
                  </div>
                  <div style={{ position: 'absolute', right: `${padding}px`, top: `${padding}px` }} >
                    <Icon type={icon} style={{ fontSize: `${_.round(titleSize * 3)}px`, color: 'rgba(127, 127, 127, 0.6)' }} />
                  </div>
                </div>
                <div style={{
                  flex: 1,
                  padding: `5px ${padding}px`,
                  textAlign: 'right',
                  backgroundColor: 'rgb(127,127,127,0.8)',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
                >
                  { footer }
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

