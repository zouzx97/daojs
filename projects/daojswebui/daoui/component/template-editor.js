import React from 'react';
import _ from 'lodash';
import { frameEditorMapper } from '../frameMapper';
import TemplateList from '../templates-list';

export default function TemplateEditor (props) {
  const { frameType = 'AppFrame', id } = _.get(props, 'match.params');
  const Editor = frameEditorMapper[frameType];
  const config = _.find(TemplateList, { id });
  return (<Editor config={config} />);
}
