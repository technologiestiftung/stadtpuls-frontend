// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";
import "whatwg-fetch";
import { cache } from "swr";
import ReactDOM from "react-dom";
import { ReactPortal } from "react";

const noop = (): void => undefined;
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();

  // mock createPortal because react-test-renderer doesn't support it
  ReactDOM.createPortal = jest.fn(element => element as ReactPortal);
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  jest.restoreAllMocks();
  server.resetHandlers();
  cache.clear();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();

  // clear previously created createPortal mock
  (ReactDOM.createPortal as jest.Mock).mockClear();
});
