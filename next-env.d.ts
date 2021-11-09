/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.css";
declare module "*.module.css" {
  const styles: { [className: string]: string };
  export default styles;
}
declare module "*.svg" {
  export default ReactNode;
}

// Default type of `self` is `WorkerGlobalScope & typeof globalThis`
// https://github.com/microsoft/TypeScript/issues/14877
declare const self: WebWorkerGlobalScope;
