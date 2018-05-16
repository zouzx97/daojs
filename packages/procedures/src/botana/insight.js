import request from 'axios';
import _ from 'lodash';
import constants from './constants.yaml';

const host = _.startsWith(location.host, 'localhost') ? constants.host : `${location.protocol}//${location.host}`;
export default function getInsightFunc(type) {
  return function insightFunc(params) {
    const uri = `${host}/${constants.path}?type=${type}`;

    return request.post(uri, params, {
      headers: {
        Business: 'Catering',
        Customer: 'Sodexo',
      },
    }).then(({ data }) => data).catch(() => []);
  };
}
