import { render, screen } from "@testing-library/react";
import { InvalidPageId } from "./InvalidPageId";
import { NoAccess } from "./NoAccess";
import { PleaseLogin } from "./PleaseLogin";
import { ProjectNotFound } from "./ProjectNotFound";
import { ServerError } from "./ServerError";

describe("component InvalidPageId", () => {
  it("should render without problem", () => {
    render(<InvalidPageId pageType='Bob' id='1234' />);
    expect(screen.getByText(/Bob/gi)).toBeInTheDocument();
    expect(screen.getByText(/1234/gi)).toBeInTheDocument();
  });
});

describe("component NoAccess", () => {
  it("should render without problem", () => {
    render(<NoAccess />);
    expect(screen.getByText(/Zugriff/gi)).toBeInTheDocument();
  });
});

describe("component PleaseLogin", () => {
  it("should render without problem", () => {
    render(<PleaseLogin />);
    expect(screen.getByText(/Anmeldung/gi)).toBeInTheDocument();
  });
});

describe("component ServerError", () => {
  it("should render without problem", () => {
    render(<ServerError error='MyCustomError' />);
    expect(screen.getByText(/MyCustomError/gi)).toBeInTheDocument();
  });
});

describe("component ProjectNotFound", () => {
  it("should render without problem", () => {
    render(<ProjectNotFound projectId='12' />);
    expect(
      screen.getByText(/Sie haben kein Projekt mit der ID "12"/gi)
    ).toBeInTheDocument();
  });
});
