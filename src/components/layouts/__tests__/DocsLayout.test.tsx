import { render } from "@testing-library/react";
import React from "react";
import DocsLayout from "../docs";

describe("Footer component", () => {
  it("should render without crashing", () => {
    const testFrontmatter = {
      metaTitle: "Test title",
      metaDescription: "Test title",
      title: "Title",
    };
    render(<DocsLayout frontMatter={testFrontmatter}>docs</DocsLayout>);
  });
});
