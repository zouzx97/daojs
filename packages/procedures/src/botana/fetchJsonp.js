import request from 'axios';
import _ from 'lodash';
import constants from './constants.yaml';

const host = _.startsWith(location.host, 'localhost') ? constants.host : `${location.protocol}//${location.host}`;
export default function fetchJsonp({ url }) {
  return request.post(`${host}/forward`, { method: 'get', url }).then(({ data }) => data).catch(() => []);
}
