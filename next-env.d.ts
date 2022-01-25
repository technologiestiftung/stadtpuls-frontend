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

declare module "react-autolinker" {
  import { ReactNode, Component } from "react";
  export default class ReactAutolinker extends Component<
    {
      className?: HTMLElement["className"];
      tagName?: string;
      renderLink?: (tag: {
        attrs: { href: string; key: string };
        innerHtml: string;
        tagName: string;
      }) => ReactNode;
      text: ReactNode;
    },
    any
  > {}
}
