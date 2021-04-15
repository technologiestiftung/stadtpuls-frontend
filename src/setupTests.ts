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
