import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectInfo, ProjectInfoPropType } from ".";

const editProjectFunction = jest.fn();

const exampleArgs: ProjectInfoPropType = {
  title: "A title",
  category: "A category",
  projectViewLink: "/123abc",
  onEditProject: editProjectFunction,
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
    render(<ProjectInfo {...exampleArgs}>{exampleArgs.children}</ProjectInfo>);
    const category = screen.getByText(exampleArgs.category);
    expect(category).toBeInTheDocument();
  });
  it("should fire a function when 'edit project' is clicked", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleArgs.children}</ProjectInfo>);
    const editProjectButton = screen.getByRole("button", {
      name: /Projekt bearbeiten/i,
    });
    userEvent.click(editProjectButton);
    expect(editProjectFunction).toHaveBeenCalledTimes(1);
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
