import { screen, render } from "@testing-library/react";
import { NotFoundPage } from ".";

describe("NotFoundPage component", () => {
  it("should render the 404 message", (): void => {
    render(<NotFoundPage />);

    const message = screen.getByText(
      /Die angeforderte Seite existiert nicht/gi
    );
    expect(message).toBeInTheDocument();
  });
  it("should render a back link", (): void => {
    render(<NotFoundPage />);

    const backLink = screen.getByText(/Zurück zur/gi);
    expect(backLink).toBeInTheDocument();
  });
});
