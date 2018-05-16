import request from 'axios';
import jsonpAdapter from 'axios-jsonp';

export default function fetch({ url }) {
  return request.get({
    url,
    adapter: jsonpAdapter,
  }).then(({ data }) => data).catch(() => ([]));
}
