import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProjectsNav, ProjectListItemType } from ".";

const handleSelectFunction = jest.fn();

const exampleProjects: ProjectListItemType[] = [
  {
    projectId: "kjasdhjkas",
    name: "Project A",
  },
  {
    projectId: "uisdzuada",
    name: "Project B",
  },
  {
    projectId: "tgedhebdm",
    name: "Project C",
  },
];

describe("component UserProjectsNav", () => {
  it("should render a list of projects", () => {
    render(
      <UserProjectsNav
        projects={exampleProjects}
        defaultSelectedProject={exampleProjects[0]}
        onSelectProject={handleSelectFunction}
      />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => expect(button).toBeInTheDocument());
  });

  it("should highlight the selected project and fire a function on change", () => {
    render(
      <UserProjectsNav
        projects={exampleProjects}
        defaultSelectedProject={exampleProjects[0]}
        onSelectProject={handleSelectFunction}
      />
    );

    const defaultSelected = screen.getByRole("button", {
      name: /Project A/i,
    });
    expect(
      defaultSelected.getAttribute("class")?.includes("navigation-link-active")
    ).toBe(true);

    userEvent.click(screen.getByRole("button", { name: /Project B/i }));

    const newlySelected = screen.getByRole("button", { name: /Project B/i });
    expect(
      newlySelected.getAttribute("class")?.includes("navigation-link-active")
    ).toBe(true);
    expect(
      defaultSelected.getAttribute("class")?.includes("navigation-link-active")
    ).toBe(false);

    expect(handleSelectFunction).toHaveBeenCalledTimes(1);
  });

  it("should not highlight a project link when no default selected project is provided", () => {
    render(
      <UserProjectsNav
        projects={exampleProjects}
        onSelectProject={handleSelectFunction}
      />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button =>
      expect(
        button.getAttribute("class")?.includes("navigation-link-active")
      ).toBe(false)
    );
  });
});
