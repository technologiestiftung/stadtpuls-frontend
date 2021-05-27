import { render, screen } from "@testing-library/react";
import { DocsSidebar } from ".";

describe("DocsSidebar component", () => {
  it("should render some links", () => {
    render(<DocsSidebar />);
    const links = screen.getAllByRole("link");
    links.forEach(link => expect(link).toBeInTheDocument());
  });
  it("should be slided left when not opened", () => {
    render(<DocsSidebar isOpened={false} />);
    const aside = document.querySelector(".-translate-x-full");
    expect(aside).toBeInTheDocument();
  });
});
