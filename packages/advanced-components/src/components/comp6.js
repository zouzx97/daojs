import React from 'react';
import _ from 'lodash';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';

const padding = 15; // px

export default function Comp6(props) {
  const {
    icon,
    title,
    body,
    chart,
  } = props;

  return (
    <ThemeContext.Consumer>
      {({ primaryColor }) => (
        <ContainerDimensions>
          { ({ width, height }) => {
            const baseSize = _.round(width / 20);

            return (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: primaryColor,
                borderRadius: '5px',
                fontSize: `${baseSize}px`,
                position: 'relative',
              }}
              >
                <div style={{
                  padding: '1em',
                }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontSize: '1.6em',
                  }}
                  >
                    { icon &&
                      <Icon type={icon} style={{ color: 'rgba(255, 255, 255, 0.9)', marginRight: '0.5em' }} />
                    }
                    <div style={{ color: 'rgba(255, 255, 255, 1)' }} >
                      { title }
                    </div>
                  </div>
                  <div style={{
                    marginTop: '0.5em',
                  }}
                  >
                    { body }
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '40%',
                  left: 0,
                  width: '100%',
                  height: '60%',
                }}
                >
                  { chart }
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

