/* eslint-disable */

import LineDemo from './line.demo';
import lineDemoSource from '!raw-loader!./line.demo.js';
import lineMD from './line.md';
import BarDemo from './bar.demo';
import barDemoSource from '!raw-loader!./bar.demo.js';
import barMD from './bar.md';


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
  },
  {
    name: 'Bar',
    category: 'chart',
    description: 'Easily visualize your data using bar chart.',
    readme: barMD,
    demo: {
      Comp: BarDemo,
      source: barDemoSource,
    }
  }
];
