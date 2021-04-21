import { ProjectListItemType } from "@components/UserProjectsNav";
import { render, screen } from "@testing-library/react";
import { UserProjectsWrapper } from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: "1",
    };
  },
}));

const exampleProjects: ProjectListItemType[] = [
  {
    projectId: "1",
    name: "Project A",
  },
  {
    projectId: "2",
    name: "Project B",
  },
  {
    projectId: "3",
    name: "Project C",
  },
];

describe("UserProjectsWrapper component", () => {
  it("should render the children", () => {
    render(
      <UserProjectsWrapper projects={exampleProjects}>
        <p>I could be a form or something else</p>
      </UserProjectsWrapper>
    );
    const child = screen.getByText("I could be a form or something else");
    expect(child).toBeInTheDocument();
  });

  it("should render the new project button", () => {
    render(
      <UserProjectsWrapper projects={exampleProjects}>
        <p>I could be a form or something else</p>
      </UserProjectsWrapper>
    );
    const link = screen.getByRole("link", {
      name: /Neues Projekt/i,
    });
    expect(link).toBeInTheDocument();
  });
});
