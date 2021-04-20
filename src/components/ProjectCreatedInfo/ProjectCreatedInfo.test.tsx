import { render, screen } from "@testing-library/react";
import { ProjectCreatedInfo } from ".";

describe("ProjectCreatedInfo component", () => {
  it("should render the given title", () => {
    render(
      <ProjectCreatedInfo projectTitle={"Some title"} token={"12345"}>
        <p>next steps description</p>
      </ProjectCreatedInfo>
    );
    const projectTitle = screen.getByRole("heading", {
      level: 2,
      name: /Some title/i,
    });
    expect(projectTitle).toBeInTheDocument();
  });

  it("should render the next steps description", () => {
    render(
      <ProjectCreatedInfo projectTitle={"Some title"} token={"12345"}>
        <p>next steps description</p>
      </ProjectCreatedInfo>
    );
    const description = screen.getByText("next steps description");
    expect(description).toBeInTheDocument();
  });

  it("should render the token", () => {
    render(
      <ProjectCreatedInfo projectTitle={"Some title"} token={"12345"}>
        <p>next steps description</p>
      </ProjectCreatedInfo>
    );
    const token = screen.getByText("12345");
    expect(token).toBeInTheDocument();
  });

  it("should render links to the next steps", () => {
    render(
      <ProjectCreatedInfo projectTitle={"Some title"} token={"12345"}>
        <p>next steps description</p>
      </ProjectCreatedInfo>
    );
    const overviewLink = screen.getByRole("link", {
      name: /Zur Projektübersicht/i,
    });
    const ttnLink = screen.getByRole("link", {
      name: /Zur TTN-Konsole/i,
    });
    expect(overviewLink).toBeInTheDocument();
    expect(ttnLink).toBeInTheDocument();
  });
});
