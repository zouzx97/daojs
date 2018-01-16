import React, { Component } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { post } from 'axios';
import _ from 'lodash';
import Promise from 'bluebird';

import SERVICE_URL from './constants';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Registry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dependencies: [],
      content: '',
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
    const url = `${SERVICE_URL}/component`;
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
    const { dependencies } = this.state;
    const used = v => _.some(dependencies, ({ entry }) => v === entry);
    const entries = _.reject(this.props.entries, used);
    const addDeps = (
      <Form.Item>
        <Button
          type="primary"
          icon="plus"
          shape="circle"
          onClick={() => {
            this.setState(_.defaults({
              dependencies: this.state.dependencies.concat([
                { variable: capitalize(entries[0]), entry: entries[0] },
              ]),
            }, this.state));
          }}
        />
      </Form.Item>
    );

    return (
      <div>
        <Form layout="inline">
          <Form.Item label="Name">
            <Input
              value={this.state.name}
              onChange={(e) => {
                this.setState(_.defaults({
                  name: e.target.value,
                }, this.state));
              }}
            />
          </Form.Item>
        </Form>
        {
          <Form layout="inline">
            <Form.Item label="Dependencies">
              { dependencies.length === 0 ? addDeps : null}
            </Form.Item>
          </Form>
        }
        {
          _.map(dependencies, ({ variable, entry }, index, ctx) => (
            <Form layout="inline">
              <Form.Item>
                <Button
                  type="danger"
                  icon="close"
                  shape="circle"
                  onClick={() => {
                    this.setState(_.defaults({
                      dependencies: _.reject(dependencies, (d, idx) => idx === index),
                    }, this.state));
                  }}
                />
              </Form.Item>
              <Form.Item label="import">
                <Input
                  value={variable}
                  onChange={(e) => {
                    this.setState(_.defaults({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({ variable: e.target.value }, d) : d
                      )),
                    }, this.state));
                  }}
                />
              </Form.Item>
              <Form.Item label="from">
                <Select
                  value={entry}
                  onChange={(e) => {
                    this.setState(_.defaults({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({ entry: e }, d) : d
                      )),
                    }, this.state));
                  }}
                >
                  {
                    _.map(entries, e => (
                      <Select.Option value={e}>{e}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
              { index === ctx.length - 1 && entries.length > 0 ? addDeps : null }
            </Form>
          ))
        }
        <Form layout="vertial">
          <Form.Item label="Content">
            <Input.TextArea
              value={this.state.content}
              onChange={(e) => {
                this.setState(_.defaults({
                  content: e.target.value,
                }, this.state));
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                const { name, content, dependencies: deps } = this.state;
                if (name && content && _.isFunction(this.props.onSubmit)) {
                  this.props.onSubmit({
                    name,
                    content,
                    dependencies: _.reduce(deps, (memo, { variable, entry }) => (
                      variable && entry ? _.assign(memo, {
                        [variable]: entry,
                      }) : memo
                    ), {}),
                  });
                }
              }}
            >
              Sumbit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Registry;
