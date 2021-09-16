import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from ".";

describe("Alert component", () => {
  it("should render an info alert without type", () => {
    render(<Alert message='Info' />);
    const alert = document.querySelector(".border-blue.bg-blue");
    expect(alert).toBeInTheDocument();
  });
  it("should render an info alert with info type", () => {
    render(<Alert type='info' message='Info' />);
    const alert = document.querySelector(".border-blue.bg-blue");
    expect(alert).toBeInTheDocument();
  });
  it("should render an error alert with error type", () => {
    render(<Alert type='error' message='error' />);
    const alert = document.querySelector(".border-error.bg-error");
    expect(alert).toBeInTheDocument();
  });
  it("should render an warning alert with warning type", () => {
    render(<Alert type='warning' message='warning' />);
    const alert = document.querySelector(".border-warning.bg-warning");
    expect(alert).toBeInTheDocument();
  });
  it("should render an success alert with success type", () => {
    render(<Alert type='success' message='success' />);
    const alert = document.querySelector(".border-green.bg-green");
    expect(alert).toBeInTheDocument();
  });
  it("should render no title if not provided", () => {
    render(<Alert message='test' />);
    const headline = screen.queryByRole("heading");
    expect(headline).not.toBeInTheDocument();
  });
  it("should render a title if provided", () => {
    render(<Alert title='title' message='test' />);
    const headline = screen.queryByRole("heading", { name: "title" });
    expect(headline).toBeInTheDocument();
  });
  it("should render a clickable close icon that removes the element", () => {
    render(<Alert message='test' />);
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
  });
  it("should render JSX content", () => {
    render(
      <Alert
        message={
          <>
            Dein Token konnte nicht generiert werden.
            <code>500 Internal Server Error</code>
          </>
        }
      />
    );
    const code = document.querySelector("code");
    expect(code).toBeInTheDocument();
  });
});
