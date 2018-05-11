import LineDemo from './line.demo';
import lineDemoRaw from 'text-loader?./line.demo';
import lineMD from './line.md';

export default {
  Line: {
    category: 'chart',
    description: 'Easily visualize your data using line chart.',
    readme: lineMD,
    demo: LineDemo,
    demoCode: lineDemoRaw,
  },
};
