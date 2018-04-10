import _ from 'lodash';
import Registry from '@daojs/registry';
import SingleSelector from './single-selector';
import PlainData from './plain-data';
import Flexbox from './flexbox';

export default new Registry().register({
  SingleSelector,
  PlainData,
  Flexbox,
}).registerAsync({
  SectionContainer: () => import('./section-container').then(_.property('default')),
});
