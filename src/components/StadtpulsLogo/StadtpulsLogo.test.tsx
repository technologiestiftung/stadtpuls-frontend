import { render, screen } from "@testing-library/react";
import { StadtpulsLogo } from ".";

describe("component StadtpulsLogo", () => {
  it("should render a link", () => {
    render(<StadtpulsLogo />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
