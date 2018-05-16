import request from 'axios';

export default function fetch({ url }) {
  return request.get(url).then(({ data }) => data).catch(() => ([]));
}
