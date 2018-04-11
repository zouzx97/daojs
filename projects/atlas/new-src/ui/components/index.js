import _ from 'lodash';
import Registry from '@daojs/registry';
import SingleSelector from './single-selector';
import PlainData from './plain-data';
import Flexbox from './flexbox';
import AdjustableContainer from './adjustable-container';
import CardContainer from './card-container';
import FlexBoxContainer from './flexbox-container';

export default new Registry().register({
  SingleSelector,
  PlainData,
  Flexbox,
  AdjustableContainer,
  CardContainer,
  FlexBoxContainer,
}).registerAsync({
  SectionContainer: () => import('./section-container').then(_.property('default')),
});
