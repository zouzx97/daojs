export default {
  key: '10000',
  type: 'SectionContainer',
  items: [{
    key: 'bar',
    input: 'bar',
    type: 'PlainData',
  }, {
    key: 'test',
    input: 'test',
    type: 'PlainData',
  }, {
    key: 'selector',
    input: 'selector',
    output: 'selectedSelector',
    type: 'SingleSelector',
  }, {
    key: 'test1',
    input: 'test1',
    type: 'PlainData',
  }, {
    key: 'combinedSectionV',
    layout: {
      flexDirection: 'vertical',
    },
    items: [{
      key: 'bar',
      input: 'bar',
      type: 'PlainData',
      layout: {
        xs: 6,
        lg: 6,
      },
    }, {
      key: 'test',
      input: 'test',
      type: 'PlainData',
    }, {
      key: 'selector',
      input: 'selector',
      output: 'selectedSelector',
      type: 'SingleSelector',
    }, {
      key: 'test1',
      input: 'test1',
      type: 'PlainData',
    }],
  }, {
    key: 'combinedSectionH',
    layout: {
      flexDirection: 'horizontal',
    },
    items: [{
      key: 'bar',
      input: 'bar',
      type: 'PlainData',
      layout: {
        xs: 12,
        lg: 12,
      },
    }, {
      key: 'test',
      input: 'test',
      type: 'PlainData',
    }, {
      key: 'selector',
      input: 'selector',
      output: 'selectedSelector',
      type: 'SingleSelector',
    }, {
      key: 'test1',
      input: 'test1',
      type: 'PlainData',
    }],
  }],
};
