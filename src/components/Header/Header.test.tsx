import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header component", () => {
  it("should render the word Berlin", () => {
    render(<Header />);
    const berlinText = screen.getByText(/Berlin/g);
    expect(berlinText).toBeInTheDocument();
  });
});
