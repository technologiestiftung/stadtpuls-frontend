import { render, screen } from "@testing-library/react";
import { ProjectInfo, ProjectInfoPropType } from ".";

const exampleArgs: ProjectInfoPropType = {
  title: "A title",
  category: "A category",
  projectViewLink: "/123abc",
  projectEditLink: "/account/projects/123abc/edit",
  children: <p>Description</p>,
};

describe("ProjectInfo component", () => {
  it("should display a h2 title", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleArgs.children}</ProjectInfo>);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: exampleArgs.title,
    });
    expect(heading).toBeInTheDocument();
  });
  it("should render its children (aka. text content)", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleArgs.children}</ProjectInfo>);
    const childrenText = screen.getByText(/Description/i);
    expect(childrenText).toBeInTheDocument();
  });
  it("should display a category tag", () => {
    render(
      <ProjectInfo {...exampleArgs} category='Hey'>
        {exampleArgs.children}
      </ProjectInfo>
    );
    const category = screen.getByText(/Hey/gi);
    expect(category).toBeInTheDocument();
  });
  it("should display a link to the project edit route", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleArgs.children}</ProjectInfo>);
    const projectEditLink = screen.getByRole("link", {
      name: "Projekt bearbeiten",
    });
    expect(projectEditLink).toBeInTheDocument();
    expect(projectEditLink.getAttribute("href")).toBe(
      exampleArgs.projectEditLink
    );
  });
  it("should display a link to the project view route", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleArgs.children}</ProjectInfo>);
    const projectViewLink = screen.getByRole("link", {
      name: "→ Projektseite",
    });
    expect(projectViewLink).toBeInTheDocument();
    expect(projectViewLink.getAttribute("href")).toBe(
      exampleArgs.projectViewLink
    );
  });
});
