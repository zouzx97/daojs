/* eslint-disable */

import LineDemo from './line.demo';
import lineDemoSource from '!raw-loader!./line.demo.js';
import lineMD from './line.md';

export default [
  {
    name: 'Line',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using line chart.',
    readme: lineMD,
    demo: {
      Comp: LineDemo,
      source: lineDemoSource,
    },
  }
];
