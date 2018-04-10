/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import { List } from 'immutable';
import PlainData from './plain-data';
import SectionContainer from './section-container';
import Flexbox from './flexbox';

class Comp {
  constructor(definition) {
    [this.name] = _.keys(definition);
    [this.value] = _.values(definition);
  }
}

export class SyncComp extends Comp {
  get() {
    return this.value;
  }
}

export class AsyncComp extends Comp {
  get() {
    return this.value();
  }
}

class ComponentRegistry {
  registry = List([
    new AsyncComp({ SingleSelector: () => import('./single-selector').then(_.property('default')) }),
    new SyncComp({ PlainData }),
    new SyncComp({ SectionContainer }),
    new SyncComp({ Flexbox }),
  ])

  get = (name) => {
    const component = this.registry.find(comp => comp.name === name);
    if (!component) {
      return _.constant(null);
    }
    return component.get();
  }
}

export default new ComponentRegistry();
