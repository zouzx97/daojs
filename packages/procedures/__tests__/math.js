import * as _ from '../builtin';

describe('Procedures - buitin - math', () => {
  test('sum', () => {
    expect(_.sum([1, 2])).toBe(3);
  });

  test('add', () => {
    expect(_.add({ augend: 2, addend: 3 })).toBe(5);
  });

  test('ceil', () => {
    expect(_.ceil({ number: 1.2341 })).toBe(2);
    expect(_.ceil({ number: 1.2341, precision: 2 })).toBe(1.24);
  });

  test('divide', () => {
    expect(_.divide({ dividend: 4, divisor: 2 })).toBe(2);
  });

  test('floor', () => {
    expect(_.floor({ number: 1.2341 })).toBe(1);
    expect(_.floor({ number: 1.2341, precision: 2 })).toBe(1.23);
  });

  test('max', () => {
    expect(_.max([5, 8, 3, 1])).toBe(8);
  });

  test('maxBy', () => {
    expect(_.maxBy({
      array: [{ n: 1 }, { n: 2 }],
      interatee: o => o.n,
    })).toMatchObject({ n: 2 });
  });

  test('mean', () => {
    expect(_.mean([4, 2, 8, 6])).toBe(5);
  });

  test('meanBy', () => {
    expect(_.meanBy({
      array: [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }],
      interatee: o => o.n,
    })).toBe(5);
    expect(_.meanBy({
      array: [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }],
      interatee: 'n',
    })).toBe(5);
  });

  test('minBy', () => {
    expect(_.minBy({
      array: [{ n: 1 }, { n: 2 }],
      interatee: o => o.n,
    })).toMatchObject({ n: 1 });
    expect(_.minBy({
      array: [{ n: 1 }, { n: 2 }],
      interatee: 'n',
    })).toMatchObject({ n: 1 });
  });

  test('multiply', () => {
    expect(_.multiply({ multiplier: 6, multiplicand: 4 })).toBe(24);
  });

  test('round', () => {
    expect(_.round({ number: 4.006 })).toBe(4);
    expect(_.round({ number: 4.006, precision: 2 })).toBe(4.01);
    expect(_.round({ number: 4060, precision: -2 })).toBe(4100);
  });

  test('subtract', () => {
    expect(_.subtract({ minuend: 6, subtrahend: 4 })).toBe(2);
  });

  test('sumBy', () => {
    expect(_.sumBy({
      array: [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }],
      interatee: o => o.n,
    })).toBe(20);
    expect(_.sumBy({
      array: [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }],
      interatee: 'n',
    })).toBe(20);
  });
});
