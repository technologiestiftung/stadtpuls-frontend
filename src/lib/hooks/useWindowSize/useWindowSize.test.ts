import { renderHook, act } from "@testing-library/react-hooks";
import { useWindowSize, WindowSizeType } from ".";

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event("resize"));
};

test("should return new values on window resize", () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { result } = renderHook(() => useWindowSize()) as unknown as {
    result: {
      current: WindowSizeType;
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  act(() => {
    window.resizeTo(666, 666);
  });

  expect(result.current.width).toBe(666);
  expect(result.current.height).toBe(666);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  act(() => {
    window.resizeTo(333, 333);
  });

  expect(result.current.width).toBe(333);
  expect(result.current.height).toBe(333);
});
