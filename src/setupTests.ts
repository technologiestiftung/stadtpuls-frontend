// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";
import "whatwg-fetch";
import { cache } from "swr";

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Worker = class Worker {
  url: string;
  onmessage: (msg: string) => void;
  onerror: () => void;
  constructor(stringUrl: string) {
    this.url = stringUrl;
    this.onmessage = () => undefined;
    this.onerror = () => undefined;
  }

  postMessage(msg: string): void {
    this.onmessage(msg);
  }
};

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
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
});
