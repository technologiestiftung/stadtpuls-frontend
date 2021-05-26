import { render, screen } from "@testing-library/react";
import { DocsSidebar } from ".";

describe("DocsSidebar component", () => {
  it("should render some links", () => {
    render(<DocsSidebar />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
