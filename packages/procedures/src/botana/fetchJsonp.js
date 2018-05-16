import jsonp from 'jsonp';
import Promise from 'bluebird';

export default function fetchJsonp({ url }) {
  return new Promise(resolve =>
    jsonp(url, null, (err, data) => {
      if (err) {
        resolve({});
      } else {
        resolve(data);
      }
    }));
}
