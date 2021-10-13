import { render, screen } from "@testing-library/react";
import { MarkerCircle } from ".";

describe("MarkerCircle component", () => {
  it("should render its children", () => {
    render(<MarkerCircle isActive>CHILD HERE</MarkerCircle>);
    const moreInfoLink = screen.getByText(/CHILD HERE/g);
    expect(moreInfoLink).toBeInTheDocument();
  });
});
