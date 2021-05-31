import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import DocsLayout from "../docs";

const testFrontmatter = {
  metaTitle: "Test title",
  metaDescription: "Test title",
  title: "Title",
};

describe("Footer component", () => {
  it("should render without crashing", () => {
    render(<DocsLayout frontMatter={testFrontmatter}>docs</DocsLayout>);
  });
  it("should render a menu toggle button", () => {
    render(<DocsLayout frontMatter={testFrontmatter}>docs</DocsLayout>);
    const openButton = screen.getByText(/Seiten/gi);
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    const closeButton = screen.getByText(/Schließen/gi);
    expect(closeButton).toBeInTheDocument();
  });
  it("should render a scroll to top button", () => {
    render(<DocsLayout frontMatter={testFrontmatter}>docs</DocsLayout>);

    window.scrollTo = jest.fn();

    const upButton = screen.getByRole("button", { name: "" });
    expect(upButton).toBeInTheDocument();

    if (!upButton) {
      screen.debug();
      throw "Up button not found!";
    }

    fireEvent.click(upButton);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
