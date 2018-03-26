const path = require('path');
const fs = require('fs-extra');
const yaml = require('yamljs');
const calculate = require('../index.js');

const sum = (...arr) => arr.reduce((a, b) => a + b, 0);
const first = value => value;

describe('calculate', () => {
  it('should be a function', () => {
    expect(calculate).toBeInstanceOf(Function);
  });

  it('should calculate correctly', async () => {
    const result = await fs
      .readFile(path.join(__dirname, 'arithmetic.yaml'), 'utf8')
      .then(yaml.parse)
      .then(co => calculate({ sum, first }, co));
    expect(result).toEqual(10);
  });
});
