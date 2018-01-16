import React, { Component } from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import { post } from 'axios';
import _ from 'lodash';
import Promise from 'bluebird';

const { TextArea } = Input;

class Registry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      config: {},
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.submit().then((response) => {
      console.log(response.data);  // eslint-disable-line
    });
  }
  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  onConfigChange(e) {
    this.setState({ config: e.target.value });
  }
  submit() {
    const url = 'http://localhost:3000/component';
    const formData = new FormData();
    let config = {};
    try {
      config = JSON.parse(this.state.config);
    } catch (e) {
      console.error('config is not json');  //eslint-disable-line
    }
    if (_.isEmpty(config)) {
      return new Promise((resolve, reject) => {
        reject(new Error('invalid config'));
      });
    }
    formData.append('uploadFile', this.state.file);
    formData.append('config', config);
    const requestHeader = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, requestHeader);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1>Registry Component</h1>
            Upload component file:
          <Input type="file" onChange={this.onFileChange} />
            Config:
          <TextArea rows={6} onChange={this.onConfigChange} />
          <Button type="submit" onClick={this.onFormSubmit}>Registry</Button>
        </form>
      </div>
    );
  }
}

export default Registry;
