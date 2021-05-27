import { render, screen } from "@testing-library/react";
import { DocsSidebar } from ".";

describe("DocsSidebar component", () => {
  it("should render some links", () => {
    render(<DocsSidebar />);
    const links = screen.getAllByRole("link");
    links.forEach(link => expect(link).toBeInTheDocument());
  });
});
