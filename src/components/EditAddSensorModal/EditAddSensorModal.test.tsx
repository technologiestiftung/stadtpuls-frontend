import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { EditAddSensorModal } from ".";

const baseTestData = {
  title: "Test Title",
  onDelete: jest.fn(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
};

const successTestData = {
  categoryId: 1,
  description: "A description",
  integration: "http" as const,
  ttnDeviceId: undefined,
  latitude: 48.8586383,
  longitude: 2.2946208,
  name: "A title",
  symbolId: 1,
};

describe("EditAddSensorModal component", () => {
  it("should render correctly", () => {
    render(<EditAddSensorModal {...baseTestData} />);

    // MODAL TITLE
    const title = screen.getByRole("heading", { name: baseTestData.title });
    expect(title).toBeInTheDocument();

    // NAME INPUT
    const nameLabel = screen.getByText("Name");
    expect(nameLabel).toBeInTheDocument();

    const nameField = screen.getByRole("textbox", { name: "Name" });
    expect(nameField).toBeInTheDocument();

    // SENSOR ICON SELECT
    const sensorIconLabel = screen.getByText("Kategorie");
    expect(sensorIconLabel).toBeInTheDocument();

    const sensorIconField = screen.getByRole("button", {
      name: "Symbol Bitte wähle eine Option",
    });
    expect(sensorIconField).toBeInTheDocument();

    // DESCRIPTION TEXTAREA
    const descLabel = screen.getByText("Beschreibung");
    expect(descLabel).toBeInTheDocument();

    const descField = screen.getByRole("textbox", { name: "Beschreibung" });
    expect(descField).toBeInTheDocument();

    // CATEGORY SELECT
    const categoryLabel = screen.getByText("Kategorie");
    expect(categoryLabel).toBeInTheDocument();

    const categoryField = screen.getByRole("button", {
      name: "Kategorie Wähle eine Kategorie",
    });
    expect(categoryField).toBeInTheDocument();

    // LATITUDE INPUT
    const latLabel = screen.getByText("Latitude");
    expect(latLabel).toBeInTheDocument();

    const latField = screen.getByRole("spinbutton", { name: "Latitude" });
    expect(latField).toBeInTheDocument();

    // LONGITUDE INPUT
    const lngLabel = screen.getByText("Longitude");
    expect(lngLabel).toBeInTheDocument();

    const lngField = screen.getByRole("spinbutton", { name: "Longitude" });
    expect(lngField).toBeInTheDocument();

    // LAT/LNG MAP
    const map = screen.getByRole("region");
    expect(map).toBeInTheDocument();

    // INTEGRATION SELECT
    const integrationLabel = screen.getByText("Integration");
    expect(integrationLabel).toBeInTheDocument();

    const integrationField = screen.getByRole("button", {
      name: "Integration HTTP",
    });
    expect(integrationField).toBeInTheDocument();
  });
  it("should call the appropriate handlers when buttons clicked", async (): Promise<void> => {
    render(
      <EditAddSensorModal {...baseTestData} defaultValues={successTestData} />
    );

    const deleteButton = screen.getByRole("button", { name: "Löschen" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(baseTestData.onDelete).toHaveBeenCalled();

    const cancelButton = screen.getByRole("button", { name: "Abbrechen" });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(baseTestData.onCancel).toHaveBeenCalled();

    const submitButton = screen.getByRole("button", { name: "Speichern" });
    expect(submitButton).toBeInTheDocument();

    const form = document.querySelector("form");
    if (!form) throw "From element was not found";
    fireEvent.submit(form);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(baseTestData.onSubmit).toHaveBeenCalledWith(successTestData);
    });
  });
});
