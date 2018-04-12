export default {
  key: '10000',
  type: 'AdjustableContainer',
  items: [{
    key: 'bar',
    input: 'bar',
    type: 'TextBlock',
  }, {
    key: 'test',
    input: 'test',
    type: 'TextBlock',
  }, {
    key: 'selector',
    input: 'selector',
    output: 'selectedSelector',
    type: 'SingleSelector',
  }, {
    key: 'test1',
    input: 'test1',
    type: 'TextBlock',
  }, {
    key: 'combinedSectionV',
    type: 'CardContainer',
    items: [{
      key: 'testflexbox',
      type: 'FlexBoxContainer',
      items: [{
        key: 'bar',
        input: 'bar',
        type: 'TextBlock',
        style: {
          xs: 6,
          lg: 6,
        },
      }, {
        key: 'test',
        input: 'test',
        type: 'TextBlock',
      }, {
        key: 'selector',
        input: 'selector',
        output: 'selectedSelector',
        type: 'SingleSelector',
      }, {
        key: 'test1',
        input: 'test1',
        type: 'TextBlock',
      }],
    }],
  }, {
    key: 'combinedSectionH',
    type: 'CardContainer',
    actions: [
      {
        key: 'selector',
        input: 'selector',
        output: 'selectedSelector',
        type: 'SingleSelector',
      },
    ],
    items: [{
      key: 'bar',
      input: 'bar',
      type: 'TextBlock',
      style: {
        xs: 12,
        lg: 12,
      },
    }, {
      key: 'test',
      input: 'test',
      type: 'TextBlock',
    }, {
      key: 'selector',
      input: 'selector',
      output: 'selectedSelector',
      type: 'SingleSelector',
    }, {
      key: 'test1',
      input: 'test1',
      type: 'TextBlock',
    }],
  }],
};
