import { fireEvent, render, screen } from "@testing-library/react";
import { TableOfContents } from ".";

const testLinks = [
  { id: "a", text: "A" },
  { id: "b", text: "B" },
];

describe("TableOfContents component", () => {
  it("should render the passed links", () => {
    render(<TableOfContents links={testLinks} />);
    const linkA = screen.getByRole("button", { name: "A" });
    const linkB = screen.getByRole("button", { name: "B" });
    expect(linkA).toBeInTheDocument();
    expect(linkB).toBeInTheDocument();
  });
  it("should not scroll if no target", () => {
    render(<TableOfContents links={testLinks} />);
    const linkA = screen.getByRole("button", { name: "A" });
    expect(linkA).toBeInTheDocument();

    window.scrollTo = jest.fn();
    fireEvent.click(linkA);

    expect(window.scrollTo).toHaveBeenCalledTimes(0);
  });
  it("should scroll if target there", () => {
    render(
      <>
        <TableOfContents links={testLinks} />
        <div id='a' />
      </>
    );
    const linkA = screen.getByRole("button", { name: "A" });
    expect(linkA).toBeInTheDocument();

    window.scrollTo = jest.fn();
    fireEvent.click(linkA);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
