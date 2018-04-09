import _ from 'lodash';
import AsyncRegistry from '@daojs/async-registry';
import SingleSelector from './single-selector';
import PlainData from './plain-data';


export default new AsyncRegistry().register({
  SingleSelector,
  PlainData,
}).registerAsync({
  SectionContainer: () => import('./section-container').then(_.property('default')),
});
