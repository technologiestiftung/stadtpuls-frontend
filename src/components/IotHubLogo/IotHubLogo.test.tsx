import { render, screen } from "@testing-library/react";
import { IotHubLogo } from ".";

describe("component IotHubLogo", () => {
  it("should render the words Berlin IoT Hub", () => {
    render(<IotHubLogo />);
    const logo = screen.getByText(/Berlin/g);
    const iotHub = screen.getByText(/IoT Hub/g);
    expect(logo).toBeInTheDocument();
    expect(iotHub).toBeInTheDocument();
  });
  it("should render the logo image", () => {
    render(<IotHubLogo />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
  it("should render a link", () => {
    render(<IotHubLogo />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
