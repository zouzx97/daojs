import axios from 'axios';
import _ from 'lodash';
import Promise from 'bluebird';
import builtinComponentsPromise from '@daojs/builtin-components/demo';
import advancedComponentsPromise from '@daojs/advanced-components/demo';
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
      .then((response) => {
        const rawComps = _.get(response, 'data.children', []);
        const filteredComps = _.reject(rawComps, comp => _.includes(BLACK_LIST, comp.name));

        return filteredComps;
      })
      .catch(() => []);
  }

  return Promise.all([builtinComponentsPromise, advancedComponentsPromise])
    .spread((biComps, aComps) => [...biComps, ...aComps]);
})();

export const search = (() => {
  const getCompsLowerCase = getAllComponents.then((comps) => {
    const compsLowerCase = _.map(comps, ({ name, ...other }) => ({
      name,
      nameLowerCase: _.toLower(name),
      ...other,
    }));

    return compsLowerCase;
  });

  return function wrappedSearch({
    query = '',
  } = {}) {
    const queryLowerCase = _.toLower(query);

    return getCompsLowerCase.then((comps) => {
      const filteredComps = _.filter(
        comps,
        ({ nameLowerCase }) => _.includes(nameLowerCase, queryLowerCase),
      );

      return filteredComps;
    });
  };
})();


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

  return getAllComponents.then(comps => ({
    data: _.find(comps, ({ name: compName }) => compName === name),
  }));
}
