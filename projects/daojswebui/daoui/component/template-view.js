import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'antd';
import { frameMapper } from '../frameMapper';
import ComponentRegistry from '../../components-registry';

class TemplateView extends React.PureComponent {
  render() {
    const {
      routeName,
      id,
      frameType = 'AppFrame',
    } = this.props;

    const Frame = frameMapper[frameType];
    const props = _.omit(this.props, ['frameType', 'routeName', 'id']);

    const content = (<Frame
      {...props}
      componentRegistry={ComponentRegistry}
    />);

    return (
      <div>
        <Button
          type="primary"
          href={`#/templates/${routeName}/stories`}
          style={{
            margin: '0.5rem 3rem',
          }}
        >
          View
        </Button>
        <Button
          href={`#/editor/${frameType}/${id}`}
          style={{
            margin: '0.5rem 3rem',
            background: '#4CAF50',
            color: 'white',
          }}
        >
          Copy & Try online >>
        </Button>
        {content}
      </div>
    );
  }
}


TemplateView.propTypes = {
  routeName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  frameType: PropTypes.string.isRequired,
};

export default TemplateView;
