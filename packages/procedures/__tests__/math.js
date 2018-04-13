import {
  sum,
  add,
} from '../builtin';

describe('Procedures - buitin - math', () => {
  test('sum', () => {
    expect(sum([1, 2])).toBe(3);
  });

  test('add', () => {
    expect(add({ augend: 2, addend: 3 })).toBe(5);
  });
});
