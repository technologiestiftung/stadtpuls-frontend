import { render, screen } from "@testing-library/react";
import { StadtpulsLogo } from ".";

describe("component StadtpulsLogo", () => {
  it("should render the words Stadt & puls", () => {
    render(<StadtpulsLogo />);
    const stadt = screen.getByText(/Stadt/g);
    const puls = screen.getByText(/puls/g);
    expect(stadt).toBeInTheDocument();
    expect(puls).toBeInTheDocument();
  });
  it("should render the logo image", () => {
    render(<StadtpulsLogo />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
  it("should render a link", () => {
    render(<StadtpulsLogo />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
