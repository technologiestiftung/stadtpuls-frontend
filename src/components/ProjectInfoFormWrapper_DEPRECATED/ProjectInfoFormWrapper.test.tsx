import { render, screen } from "@testing-library/react";
import { ProjectInfoFormWrapper } from ".";

const handleCancelFunction = jest.fn();

describe("ProjectInfoFormWrapper component", () => {
  it("should render the children", () => {
    render(
      <ProjectInfoFormWrapper type='create' handleCancel={handleCancelFunction}>
        Hello
      </ProjectInfoFormWrapper>
    );
    const child = screen.getByText("Hello");
    expect(child).toBeInTheDocument();
  });

  it("should have Create heading when type is 'create'", () => {
    render(
      <ProjectInfoFormWrapper type='create' handleCancel={handleCancelFunction}>
        Hello
      </ProjectInfoFormWrapper>
    );
    const title = screen.getByRole("heading", {
      level: 2,
      name: /Projekt erstellen/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("should have Create footer when type is 'create'", () => {
    render(
      <ProjectInfoFormWrapper type='create' handleCancel={handleCancelFunction}>
        Hello
      </ProjectInfoFormWrapper>
    );
    const continueButton = screen.getByRole("button", {
      name: /Weiter/i,
    });
    expect(continueButton).toBeInTheDocument();
  });

  it("should have Edit heading when type is 'edit'", () => {
    render(
      <ProjectInfoFormWrapper type='edit' handleCancel={handleCancelFunction}>
        Hello
      </ProjectInfoFormWrapper>
    );
    const title = screen.getByRole("heading", {
      level: 2,
      name: /Projekt bearbeiten/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("should have Edit footer when type is 'edit'", () => {
    render(
      <ProjectInfoFormWrapper type='edit' handleCancel={handleCancelFunction}>
        Hello
      </ProjectInfoFormWrapper>
    );
    const deleteButton = screen.getByRole("button", {
      name: /Projekt löschen/i,
    });
    const cancelButton = screen.getByRole("button", {
      name: /Abbrechen/i,
    });
    const saveButton = screen.getByRole("button", {
      name: /Speichern/i,
    });
    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
