import "@testing-library/jest-dom";

Object.defineProperty(document, "fonts", {
  value: {
    ready: Promise.resolve(),
  },
  configurable: true,
});