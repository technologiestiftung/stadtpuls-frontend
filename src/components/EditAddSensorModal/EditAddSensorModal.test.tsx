import { parsedSensors } from "@mocks/supabaseData/sensors";
import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { EditAddSensorModal } from ".";

const baseTestData = {
  title: "Test Title",
  onDelete: jest.fn(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
};

const successTestData = parsedSensors[0];

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
      name: "Symbol Symbol",
    });
    expect(sensorIconField).toBeInTheDocument();

    // DESCRIPTION TEXTAREA
    const descLabel = screen.getByText("Beschreibung");
    expect(descLabel).toBeInTheDocument();

    const descField = screen.getByRole("textbox", {
      name: "Beschreibung (Optional)",
    });
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

    await waitFor(() => {
      expect(baseTestData.onSubmit).toHaveBeenCalledWith({
        name: successTestData.name,
        symbolId: successTestData.symbolId,
        description: successTestData.description,
        categoryId: successTestData.categoryId,
        latitude: successTestData.latitude,
        longitude: successTestData.longitude,
        connectionType: successTestData.connectionType,
        ttnDeviceId: successTestData.ttnDeviceId,
      });
    });
  });
  it("should set focus on name field after", async (): Promise<void> => {
    render(<EditAddSensorModal {...baseTestData} />);

    const nameField = screen.getByRole("textbox", { name: "Name" });
    expect(nameField).toBeInTheDocument();

    await waitFor(
      () => {
        expect(nameField).toHaveFocus();
      },
      { timeout: 110 }
    );
  });
});
