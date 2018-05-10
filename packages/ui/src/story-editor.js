import React from 'react';
import _ from 'lodash';
import { Input, Row, Col } from 'antd';
import Storyboard from './storyboard';

const { TextArea } = Input;

export default class StoryEditor extends React.PureComponent {
  static getDerivedStateFromProps(nextProps) {
    return { content: JSON.stringify(nextProps.value) };
  }

  constructor(props) {
    super(props);
    this.state = {
      content: JSON.stringify(this.props.value),
    };
  }

  updateStory(val) {
    try {
      this.setState({
        content: val,
      });

      const story = JSON.parse(val);
      if (!_.isEqual(story, this.props.story)) {
        this.props.onChange(story);
      }
    } catch (e) {
      // not update
    }
  }

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <TextArea
              autosize={{
                minRows: 50,
              }}
              value={this.state.content}
              autoComplete="on"
              onChange={event => this.updateStory(event.target.value)}
            />
          </Col>
          <Col span={12}>
            <Storyboard story={this.props.value} />
          </Col>
        </Row>
      </div>
    );
  }
}
