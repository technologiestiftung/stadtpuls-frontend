import { linear, easeInOutQuint } from ".";

test("easeInOutQuint", () => {
  expect(easeInOutQuint(10)).toBe(944785);
  expect(easeInOutQuint(50)).toBe(4519603985);
  expect(easeInOutQuint(100)).toBe(152158407985);
});

test("linear", () => {
  expect(linear(10)).toBe(10);
  expect(linear(50)).toBe(50);
  expect(linear(100)).toBe(100);
});
