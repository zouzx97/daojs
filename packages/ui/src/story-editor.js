import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import Storyboard from './storyboard';


function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
}

function safeStringify(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    return '';
  }
}

export default class StoryEditor extends React.PureComponent {
  static propTypes = {
    value: PropTypes.objectOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  updateStory = (valueString) => {
    const valueObject = safeParse(valueString);

    if (!_.isEmpty(valueObject) && !_.isEqual(valueObject, this.props.value)) {
      this.props.onChange(valueObject);
    }
  }

  render() {
    const { value: valueObject } = this.props;
    const valueString = safeStringify(valueObject);

    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <MonacoEditor
              width="800"
              height="750"
              language="json"
              theme="vs"
              value={valueString}
              // options={options}
              onChange={this.updateStory}
              // editorDidMount={::this.editorDidMount}
              requireConfig={{
                url: '/dist/vs/loader.js',
                paths: {
                  vs: '/dist/vs',
                },
              }}
            />
          </Col>
          <Col span={12}>
            <Storyboard story={valueObject} />
          </Col>
        </Row>
      </div>
    );
  }
}
