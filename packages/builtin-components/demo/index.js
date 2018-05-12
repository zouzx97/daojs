/* eslint-disable */

import lineDemo from './line.demo';
import lineDemoSource from '!raw-loader!./line.demo.js';
import lineMD from './md/line.md';

import barDemo from './bar.demo';
import barDemoSource from '!raw-loader!./bar.demo.js';
import barMD from './md/bar.md';

import lineBarDemo from './lineBar.demo';
import lineBarDemoSource from '!raw-loader!./lineBar.demo.js';

import chinaMapDemo from './chinaMap.demo';
import chinaMapDemoSource from '!raw-loader!./chinaMap.demo.js';

import donutDemo from './donut.demo';
import donutDemoSource from '!raw-loader!./donut.demo.js';

import funnelDemo from './funnel.demo';
import funnelDemoSource from '!raw-loader!./funnel.demo.js';

import stackBarDemo from './stackBar.demo';
import stackBarDemoSource from '!raw-loader!./stackBar.demo.js';

export default [
  {
    name: '堆栈柱状图',
    key: 'stack-bar',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using stack bar chart.',
    readme: lineMD,
    demo: {
      Comp: stackBarDemo,
      source: stackBarDemoSource,
    },
  },
  {
    name: '漏斗图',
    key: 'funnel',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using funnel chart.',
    readme: lineMD,
    demo: {
      Comp: funnelDemo,
      source: funnelDemoSource,
    },
  },
  {
    name: '圆环图',
    key: 'donut',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using donut chart.',
    readme: lineMD,
    demo: {
      Comp: donutDemo,
      source: donutDemoSource,
    },
  },
  {
    name: '线段柱状图',
    key: 'line-bar',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using line-bar chart.',
    readme: lineMD,
    demo: {
      Comp: lineBarDemo,
      source: lineBarDemoSource,
    },
  },
  {
    name: '柱状图',
    key: 'bar',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using bar chart.',
    readme: barMD,
    demo: {
      Comp: barDemo,
      source: barDemoSource,
    },
  },
  {
    name: '中国地图',
    key: 'map-china',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using bar chart.',
    readme: barMD,
    demo: {
      Comp: chinaMapDemo,
      source: chinaMapDemoSource,
    },
  },
  {
    name: '线段图',
    key: 'line',
    // possible values: chart, slicer, utility, layout, container
    category: 'chart',
    description: 'Easily visualize your data using line chart.',
    readme: lineMD,
    demo: {
      Comp: lineDemo,
      source: lineDemoSource,
    },
  },
];
