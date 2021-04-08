import { render, screen } from "@testing-library/react";
import { Footer } from ".";

describe("Footer component", () => {
  it("should render the impressum link", () => {
    render(<Footer />);
    const berlinText = screen.getByText(/Impressum/g);
    expect(berlinText).toBeInTheDocument();
  });
  it("should render the Datenschutz link", () => {
    render(<Footer />);
    const berlinText = screen.getByText(/Datenschutz/g);
    expect(berlinText).toBeInTheDocument();
  });
});
