const { sum, multiply, divide } = require('./02-math');

test('adds 1+ 3 should be 4', () => {
  const res = sum(1, 3);
  expect(res).toBe(4);
});

test('multiply 1 * 3 should be 3', () => {
  const res = multiply(1, 3);
  expect(res).toBe(3);
});

test('divide 6 / 3 should be 2', () => {
  const res = divide(6, 3);
  expect(res).toBe(2);
});

test('divide zero', () => {
  const res = divide(6, 0);
  expect(res).toBeNull();
});
