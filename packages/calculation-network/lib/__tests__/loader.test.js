const path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');
const yaml = require('yamljs');
const Loader = require('../loader');

describe('Loader', () => {
  describe('#constructor', () => {
    it('should create the loader', () => {
      expect(() => new Loader()).not.toThrow();
      expect(() => new Loader({ sum: _.sum })).not.toThrow();
    });

    it('should check for invalid procedure', () => {
      expect(() => new Loader({ boom: 'boom' })).toThrow('Invalid procedure "boom"');
    });
  });

  describe('#load()', () => {
    it('should load the CalculationNetwork correctly', async () => {
      const loader = new Loader({
        sum: (...args) => Promise.delay(0, _.sum(...args)),
      });
      const json = yaml.load(path.join(__dirname, 'resources/test.yaml'));
      const cn = await loader.load(json);

      await expect(Promise.all([
        cn.get('foo'),
        cn.get('bar'),
        cn.get('tic'),
        cn.get('tac'),
        cn.get('toe'),
      ])).resolves.toEqual([3, 2, 9, 10, 4]);

      expect(cn.set({ bar: 3 })).toEqual(['bar', 'tic', 'tac']);
      await expect(Promise.all([
        cn.get('foo'),
        cn.get('bar'),
        cn.get('tic'),
        cn.get('tac'),
        cn.get('toe'),
      ])).resolves.toEqual([3, 3, 10, 11, 4]);
    });
  });
});
