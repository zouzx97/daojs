import axios from 'axios';
import _ from 'lodash';
import builtinComponentsPromise from '@daojs/builtin-components/demo';
import { SERVICE_URL, BLACK_LIST, MODE } from './constants';

export function postComponent(options) {
  const { name } = options;
  const url = `${SERVICE_URL}/components/${name}`;
  return axios
    .post(url, _.omit(options, 'name'), {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch((e) => {
      console.error(e); // eslint-disable-line
    });
}

const getAllComponents = (() => {
  if (MODE === 'server') {
    return axios.get(`${SERVICE_URL}/list/@/`)
      .then(response => _.chain(response)
        .get('data.children', [])
        .reject(item => _.includes(BLACK_LIST, item.name))
        .value())
      .catch(() => []);
  }

  return builtinComponentsPromise;
})();

// TODO: will support real query, just list and concat children
export function search({
  query = '',
} = {}) {
  return getAllComponents.then(comps => _.filter(comps, comp => _.includes(comp.name, query)));
}

// TODO: just list direct children of query
export function listChildren({
  query,
} = {}) {
  const url = `${SERVICE_URL}/list/@/${query}`;
  return axios
    .get(url)
    .catch((e) => {
      console.error(e); // eslint-disable-line
      return { children: [] };
    });
}

export function getComponent({ name, version = 0 }) {
  if (MODE === 'server') {
    let url = `${SERVICE_URL}/components/@/${name}`;
    if (version) {
      url = `${url}?v=${version}`;
    }
    return axios
      .get(url)
      .then(response => _.defaults({
        data: _.defaults(response.data, {
          version,
        }),
      }, response))
      .catch((e) => {
        console.error(e); // eslint-disable-line
        return { data: {} };
      });
  }

  return builtinComponentsPromise.then(comps => ({
    data: _.find(comps, ({ name: compName }) => compName === name),
  }));
}
