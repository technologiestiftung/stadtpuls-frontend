import { render, screen } from "@testing-library/react";
import { Footer } from ".";

describe("Footer component", () => {
  it("should render the Feedback link", () => {
    render(<Footer />);
    const imprintText = screen.getByText(/Feedback/g);
    expect(imprintText).toBeInTheDocument();
  });
  it("should render the nutzungbedingungen link", () => {
    render(<Footer />);
    const imprintText = screen.getByText(/Nutzungsbedingungen/g);
    expect(imprintText).toBeInTheDocument();
  });
  it("should render the impressum link", () => {
    render(<Footer />);
    const imprintText = screen.getByText(/Impressum/g);
    expect(imprintText).toBeInTheDocument();
  });
  it("should render the Datenschutzerkl√§rung link", () => {
    render(<Footer />);
    const dataprivacyText = screen.getByText(/Datenschutzerkl√§rung/g);
    expect(dataprivacyText).toBeInTheDocument();
  });
});
