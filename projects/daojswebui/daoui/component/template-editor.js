import React from 'react';
import { Layout } from 'antd';
// import _ from 'lodash';
import { frameEditorMapper } from '../frameMapper';
// import TemplateList from '../templates-list';
import ComponentRegistry from '../../components-registry';

const { Content } = Layout;

export default function TemplateEditor (props) {
  // const { frameType = 'AppFrame', id } = _.get(props, 'match.params');
  // const Editor = frameEditorMapper[frameType];
  // const config = _.find(TemplateList, { id });
  const { config } = props;
  const { frameType } = config;
  const Editor = frameEditorMapper[frameType];
  return (
    <Layout style={{ clear: 'both' }}>
      <Content>
        <Editor config={config} componentRegistry={ComponentRegistry} />
      </Content>
    </Layout>
  );
}
