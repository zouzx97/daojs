const CalculationNetwork = require('../index.js');

describe('CalculationNetwork', () => {
  describe('#constructor()', () => {
    it('should be a function', () => {
      expect(CalculationNetwork).toBeInstanceOf(Function);
    });

    it('should create the CalculationNetwork correctly', () => {
      expect(() => new CalculationNetwork({
        parameters: { foo: 1, bar: 2 },
        cells: {
          tic: {
            dependencies: ['foo', 'bar'],
            factory: (foo, bar, boom) => foo + bar + boom,
          },
        },
      })).not.toThrow();
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

    it('should check for circular dependencies', () => {
      expect(() => new CalculationNetwork({
        parameters: { foo: 1, bar: 2 },
        cells: {
          tic: {
            dependencies: ['foo', 'bar', 'tac'],
            factory: (foo, bar, tac) => foo + bar + tac,
          },
          tac: {
            dependencies: ['foo', 'bar', 'tic'],
            factory: (foo, bar, tic) => foo + bar + tic,
          },
        },
      })).toThrow('Circular dependencies');
    });
  });
});
