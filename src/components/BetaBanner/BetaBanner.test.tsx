import { render, screen } from "@testing-library/react";
import { BetaBanner } from ".";

describe("BetaBanner component", () => {
  it("should render without crashing", () => {
    render(<BetaBanner />);
    const betaWord = screen.getByText("BETA");
    expect(betaWord).toBeInTheDocument();
  });
});
