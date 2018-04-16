import React from 'react';
import { Modal, Input } from 'antd';

export default class CustomStory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storyJson: '',
    };
  }

  render() {
    return (
      <Modal
        title="Basic Modal"
        visible={this.props.isCustomStoryEditorVisible}
        onOk={() => this.props.commitNewCustomStory(this.state.storyJson)}
        onCancel={this.props.discardCustomStoryEditing}
      >
        <Input.TextArea
          placeholder="Input your json story"
          autosize
          onChange={(e) => {
            this.setState({
              storyJson: e.target.value,
            });
          }}
        />
      </Modal>
    );
  }
}
