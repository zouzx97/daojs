import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';

const padding = 15; // px

function Comp4(props) {
  const {
    title,
    subTitle,
    icon,
    footer,
  } = props;

  return (
    <div className="card4">
      <ThemeContext.Consumer>
        {({ primaryColor }) => (
          <ContainerDimensions>
            { ({ width }) => {
              const titleSize = _.round(width / 13);
              const subTitleSize = _.round(width / 20);

              return (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: primaryColor,
                  borderRadius: '5px',
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
                      <Icon type={icon} style={{ fontSize: `${_.round(titleSize * 3)}px`, color: 'rgba(191, 191, 191, 0.4)' }} />
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    padding: `5px ${padding}px`,
                    textAlign: 'right',
                    backgroundColor: 'rgb(127,127,127,0.8)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    borderBottomLeftRadius: 'inherit',
                    borderBottomRightRadius: 'inherit',
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
    </div>
  );
}

Comp4.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.string,
  footer: PropTypes.element,
};

Comp4.defaultProps = {
  title: '',
  subTitle: '',
  icon: '',
  footer: null,
};

export default Comp4;
