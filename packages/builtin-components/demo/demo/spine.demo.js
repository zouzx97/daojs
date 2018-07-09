import { withProps } from 'recompose';

import builtinComponents from '../../src/index';

const {
  Spine,
} = builtinComponents;

const enhance = withProps({
  source: [
    {
      Date: '周一',
      Income: 100,
      Outcome: -50,
    },
    {
      Date: '周二',
      Income: 200,
      Outcome: -180,
    },
    {
      Date: '周三',
      Income: 190,
      Outcome: -89,
    },
    {
      Date: '周四',
      Income: 700,
      Outcome: -605,
    },
    {
      Date: '周五',
      Income: 900,
      Outcome: -590,
    },
    {
      Date: '周六',
      Income: 300,
      Outcome: -200,
    },
    {
      Date: '周日',
      Income: 290,
      Outcome: -100,
    },
  ],
  keys: ['Date', 'Income', 'Outcome'],
});

export default enhance(Spine);
