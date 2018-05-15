import request from 'axios';
import constants from './constants.yaml';

export default function getInsightFunc(type) {
  return function insightFunc(params) {
    const uri = `${constants.host}/${constants.path}?type=${type}`;

    return request.post(uri, params, {
      headers: {
        Business: 'Catering',
        Customer: 'Sodexo',
      },
    }).then(({ data }) => data);
  };
}
