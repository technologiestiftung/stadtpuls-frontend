import { render, screen } from "@testing-library/react";
import { EditProjectForm } from ".";

const onCancelFunction = jest.fn();
const onDeleteFunction = jest.fn();

const exampleCategories = [
  {
    name: "some name A",
    value: "1",
  },
  {
    name: "some name B",
    value: "2",
  },
  {
    name: "some name C",
    value: "3",
  },
];

describe("EditProjectForm component", () => {
  it("should render a title input", () => {
    render(
      <EditProjectForm
        categoryOptions={exampleCategories}
        onCancel={onCancelFunction}
        onDelete={onDeleteFunction}
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
        onDelete={onDeleteFunction}
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
        onDelete={onDeleteFunction}
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
        onDelete={onDeleteFunction}
      />
    );
    const locationInput = screen.getByLabelText(/Standort/i);
    expect(locationInput).toBeInTheDocument();
  });
});
