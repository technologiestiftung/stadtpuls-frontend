import { renderHook } from "@testing-library/react-hooks";
import { useReducedMotion } from ".";

function mockQuery(matches = false): void {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

describe("useReducedMotion hook", () => {
  beforeAll(() => mockQuery());

  test("should return false when false", () => {
    mockQuery(false);
    const { result } = renderHook(() => useReducedMotion(false));

    expect(result.current).toBe(false);
  });

  test("should return true when true", () => {
    mockQuery(true);
    const { result } = renderHook(() => useReducedMotion(false));

    expect(result.current).toBe(true);
  });
});
