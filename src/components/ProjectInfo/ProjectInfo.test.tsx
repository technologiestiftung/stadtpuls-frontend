import { render, screen } from "@testing-library/react";
import { ProjectInfo } from ".";

const exampleArgs = {
  title: "A title",
  category: "A category",
  projectViewLink: "/123abc",
  editLink: "/123abc/edit",
};
const exampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

describe("ProjectInfo component", () => {
  it("should display a h2 title", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleText}</ProjectInfo>);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: exampleArgs.title,
    });
    expect(heading).toBeInTheDocument();
  });
  it("should render its children (aka. text content)", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleText}</ProjectInfo>);
    const childrenText = screen.getByText(exampleText);
    expect(childrenText).toBeInTheDocument();
  });
  it("should display a category tag", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleText}</ProjectInfo>);
    const category = screen.getByText(exampleArgs.category);
    expect(category).toBeInTheDocument();
  });
  it("should display a link to the edit project route", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleText}</ProjectInfo>);
    const editLink = screen.getByRole("link", { name: "Projekt bearbeiten" });
    expect(editLink).toBeInTheDocument();
    expect(editLink.getAttribute("href")).toBe(exampleArgs.editLink);
  });
  it("should display a link to the project view route", () => {
    render(<ProjectInfo {...exampleArgs}>{exampleText}</ProjectInfo>);
    const projectViewLink = screen.getByRole("link", {
      name: "→ Projektseite",
    });
    expect(projectViewLink).toBeInTheDocument();
    expect(projectViewLink.getAttribute("href")).toBe(
      exampleArgs.projectViewLink
    );
  });
});
