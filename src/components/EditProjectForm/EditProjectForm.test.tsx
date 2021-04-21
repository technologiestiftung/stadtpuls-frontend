import { render, screen } from "@testing-library/react";
import { EditProjectForm } from ".";

const onCancelFunction = jest.fn();

const exampleCategories = [
  {
    name: "some name A",
    value: "some value A",
  },
  {
    name: "some name B",
    value: "some value B",
  },
  {
    name: "some name C",
    value: "some value C",
  },
];

describe("EditProjectForm component", () => {
  it("should render a title input", () => {
    render(
      <EditProjectForm
        categoryOptions={exampleCategories}
        onCancel={onCancelFunction}
      />
    );
    const titleInput = screen.getByLabelText(/Titel/i);
    expect(titleInput).toBeInTheDocument();
  });
  it("should render a category select", () => {
    render(
      <EditProjectForm
        categoryOptions={exampleCategories}
        onCancel={onCancelFunction}
      />
    );
    const categorySelect = screen.getByLabelText(/Kategorie/i);
    expect(categorySelect).toBeInTheDocument();
  });
  it("should render a description textarea", () => {
    render(
      <EditProjectForm
        categoryOptions={exampleCategories}
        onCancel={onCancelFunction}
      />
    );
    const descriptionTextarea = screen.getByLabelText(/Beschreibung/i);
    expect(descriptionTextarea).toBeInTheDocument();
  });
  it("should render a location input", () => {
    render(
      <EditProjectForm
        categoryOptions={exampleCategories}
        onCancel={onCancelFunction}
      />
    );
    const locationInput = screen.getByLabelText(/Standort/i);
    expect(locationInput).toBeInTheDocument();
  });
});
