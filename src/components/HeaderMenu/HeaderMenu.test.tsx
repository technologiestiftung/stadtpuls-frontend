import { render, screen } from "@testing-library/react";
import { HeaderMenu } from ".";

describe("HeaderMenu component", () => {
  it("should render some links", () => {
    render(<HeaderMenu />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
