export default {
  key: '10000',
  type: 'AdjustableContainer',
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
    type: 'CardContainer',
    items: [{
      key: 'testflexbox',
      type: 'FlexBoxContainer',
      items: [{
        key: 'bar',
        input: 'bar',
        type: 'PlainData',
        style: {
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
    }],
  }, {
    key: 'combinedSectionH',
    type: 'CardContainer',
    items: [{
      key: 'bar',
      input: 'bar',
      type: 'PlainData',
      style: {
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
