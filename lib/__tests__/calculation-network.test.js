const CalculationNetwork = require('../index.js');

describe('CalculationNetwork', () => {
  it('should be a function', () => {
    expect(CalculationNetwork).toBeInstanceOf(Function);
  });

  it('should check for invalid dependencies', () => {
    expect(() => new CalculationNetwork({
      parameters: { foo: 1, bar: 2 },
      cells: {
        tic: {
          dependencies: ['foo', 'bar', 'boom'],
          factory: (foo, bar, boom) => foo + bar + boom,
        },
      },
    })).toThrow('Invalid dependency boom');
  });
});
