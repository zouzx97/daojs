import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';

function Comp6(props) {
  const {
    icon,
    title,
    body,
    chart,
  } = props;

  return (
    <div className="card6">
      <ThemeContext.Consumer>
        {({ primaryColor }) => (
          <ContainerDimensions>
            { ({ width }) => {
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
                  width: `${width + 10}px`,
                  marginLeft: '-5px',
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
    </div>
  );
}

Comp6.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  body: PropTypes.element,
  chart: PropTypes.element,
};

Comp6.defaultProps = {
  title: '',
  icon: '',
  body: null,
  chart: null,
};

export default Comp6;
