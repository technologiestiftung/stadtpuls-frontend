import { render, screen } from "@testing-library/react";
import { CreateProjectForm } from ".";

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

const exampleIntegrations = [
  {
    name: "some integration",
    value: "some integration value",
  },
];

describe("CreateProjectForm component", () => {
  it("should render a title input", () => {
    render(
      <CreateProjectForm
        categoryOptions={exampleCategories}
        integrationOptions={exampleIntegrations}
      />
    );
    const titleInput = screen.getByLabelText(/Titel/i);
    expect(titleInput).toBeInTheDocument();
  });
  it("should render a category select", () => {
    render(
      <CreateProjectForm
        categoryOptions={exampleCategories}
        integrationOptions={exampleIntegrations}
      />
    );
    const categorySelect = screen.getByLabelText(/Kategorie/i);
    expect(categorySelect).toBeInTheDocument();
  });
  it("should render a description textarea", () => {
    render(
      <CreateProjectForm
        categoryOptions={exampleCategories}
        integrationOptions={exampleIntegrations}
      />
    );
    const descriptionTextarea = screen.getByLabelText(/Beschreibung/i);
    expect(descriptionTextarea).toBeInTheDocument();
  });
  it("should render a location input", () => {
    render(
      <CreateProjectForm
        categoryOptions={exampleCategories}
        integrationOptions={exampleIntegrations}
      />
    );
    const locationInput = screen.getByLabelText(/Standort/i);
    expect(locationInput).toBeInTheDocument();
  });
  it("should render an integration input", () => {
    render(
      <CreateProjectForm
        categoryOptions={exampleCategories}
        integrationOptions={exampleIntegrations}
      />
    );
    const integrationInput = screen.getByLabelText(/Integration/i);
    expect(integrationInput).toBeInTheDocument();
  });
});
