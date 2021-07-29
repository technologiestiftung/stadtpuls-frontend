import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { SensorsList } from ".";

const defaults = { onChange: jest.fn(), onAdd: jest.fn(), onDelete: jest.fn() };
const createSensor = (
  key: number,
  date?: Date | null
): {
  id: number;
  externalId: string;
  name: string;
  lastRecordedAt: Date | null;
} => ({
  id: key,
  externalId: `device-${key}`,
  name: `My sensor ${key}`,
  lastRecordedAt:
    date === null ? null : date || new Date("2021-01-08T20:32:49.796Z"),
});

describe("component SensorsList", () => {
  it("should render the devices names", () => {
    const sensorA = createSensor(1);
    const sensorB = createSensor(2);
    const sensorC = createSensor(3);
    const sensors = [sensorA, sensorB, sensorC];
    render(<SensorsList {...defaults} sensors={sensors} />);
    const titleA = screen.getByText(/My sensor 1/i);
    const titleB = screen.getByText(/My sensor 2/i);
    const titleC = screen.getByText(/My sensor 3/i);
    expect(titleA).toBeInTheDocument();
    expect(titleB).toBeInTheDocument();
    expect(titleC).toBeInTheDocument();
  });
  it("should render the devices ids", () => {
    const sensorA = createSensor(1);
    const sensorB = createSensor(2);
    const sensorC = createSensor(3);
    const sensors = [sensorA, sensorB, sensorC];
    render(<SensorsList {...defaults} sensors={sensors} />);
    const deviceA = screen.getByText(/device-1/i);
    const deviceB = screen.getByText(/device-2/i);
    const deviceC = screen.getByText(/device-3/i);
    expect(deviceA).toBeInTheDocument();
    expect(deviceB).toBeInTheDocument();
    expect(deviceC).toBeInTheDocument();
  });
  it("should render relative dates based on lastRecordedAt", () => {
    const sensorA = createSensor(1, moment().subtract(3, "minutes").toDate());
    const sensorB = createSensor(2, moment().subtract(2, "days").toDate());
    const sensorC = createSensor(3, null);
    const sensors = [sensorA, sensorB, sensorC];
    render(<SensorsList {...defaults} sensors={sensors} />);
    const dateA = screen.getByText(/Vor 3 Minuten/i);
    const dateB = screen.getByText(/Vor 2 Tagen/i);
    const dateC = screen.getByText(/—/i);
    expect(dateA).toBeInTheDocument();
    expect(dateB).toBeInTheDocument();
    expect(dateC).toBeInTheDocument();
  });
  it("should call the onEdit when data is changed", () => {
    const testOnEdit = jest.fn();
    const sensorA = createSensor(1);

    render(
      <SensorsList {...defaults} sensors={[sensorA]} onChange={testOnEdit} />
    );

    const editButton = screen.getByText(/Bearbeiten/gi);
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    const [idInput, nameInput] = screen.getAllByRole("textbox");
    expect(idInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    fireEvent.change(idInput, { target: { value: "device-B" } });
    fireEvent.change(nameInput, { target: { value: "I like to change" } });

    const submitButton = screen.getByText(/Speichern/gi);
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(testOnEdit).toHaveBeenCalledWith({
      ...sensorA,
      externalId: "device-B",
      name: "I like to change",
    });
  });
  it("should close edit mode when key enter is pressed", () => {
    render(<SensorsList {...defaults} sensors={[createSensor(1)]} />);

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const saveButton1 = screen.getByText(/Speichern/gi);
    expect(saveButton1).toBeInTheDocument();

    const [idInput] = screen.getAllByRole("textbox");
    fireEvent.keyUp(idInput, { key: "Enter", code: "Enter" });

    const editButton3 = screen.getByText(/Bearbeiten/gi);
    expect(editButton3).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Bearbeiten/gi));

    const saveButton2 = screen.getByText(/Speichern/gi);
    expect(saveButton2).toBeInTheDocument();

    const [, nameInput] = screen.getAllByRole("textbox");
    fireEvent.keyUp(nameInput, { key: "Enter", code: "Enter" });

    const editButton4 = screen.getByText(/Bearbeiten/gi);
    expect(editButton4).toBeInTheDocument();
  });
  it("should close edit mode when key escape is pressed", () => {
    render(<SensorsList {...defaults} sensors={[createSensor(1)]} />);

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const saveButton1 = screen.getByText(/Speichern/gi);
    expect(saveButton1).toBeInTheDocument();

    const [idInput] = screen.getAllByRole("textbox");
    fireEvent.keyUp(idInput, { key: "Escape", code: "Escape" });

    const editButton3 = screen.getByText(/Bearbeiten/gi);
    expect(editButton3).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Bearbeiten/gi));

    const saveButton2 = screen.getByText(/Speichern/gi);
    expect(saveButton2).toBeInTheDocument();

    const [, nameInput] = screen.getAllByRole("textbox");
    fireEvent.keyUp(nameInput, { key: "Escape", code: "Escape" });

    const editButton4 = screen.getByText(/Bearbeiten/gi);
    expect(editButton4).toBeInTheDocument();
  });
  it("should close edit mode when clicked outside with no changes", () => {
    render(
      <>
        <SensorsList {...defaults} sensors={[createSensor(1)]} />
        <button>other thing outside</button>
      </>
    );

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const saveButton = screen.queryByText(/Speichern/gi);
    expect(saveButton).toBeInTheDocument();

    const outsideButton = screen.getByText(/other thing outside/gi);
    expect(outsideButton).toBeInTheDocument();

    fireEvent.click(outsideButton);

    expect(saveButton).not.toBeInTheDocument();
    const editButton2 = screen.getByText(/Bearbeiten/gi);
    expect(editButton2).toBeInTheDocument();
  });
  it("should not close edit mode when clicked outside with changes", () => {
    render(
      <>
        <SensorsList {...defaults} sensors={[createSensor(1)]} />
        <button>other thing outside</button>
      </>
    );

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const [idInput] = screen.getAllByRole("textbox");
    expect(idInput).toBeInTheDocument();

    fireEvent.change(idInput, { target: { value: "device-B" } });

    const outsideButton = screen.getByText(/other thing outside/gi);
    expect(outsideButton).toBeInTheDocument();

    fireEvent.click(outsideButton);

    const saveButton = screen.queryByText(/Speichern/gi);
    expect(saveButton).toBeInTheDocument();
    const editButton2 = screen.queryByText(/Bearbeiten/gi);
    expect(editButton2).not.toBeInTheDocument();
  });
  it("should call the onDelete with confirmation when delete link is clicked", () => {
    const testOnEdit = jest.fn();
    const sensorA = createSensor(1);
    render(
      <SensorsList {...defaults} sensors={[sensorA]} onDelete={testOnEdit} />
    );
    const deleteButton = screen.getByText(/Löschen/gi);
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const confirmation = screen.getByText(/Bitte bestätige/gi);
    expect(confirmation).toBeInTheDocument();
    const [confirmButton] = screen.getAllByText(/Löschen/gi);
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(testOnEdit).toHaveBeenCalledWith(1);
  });
  it("should cancel the confirmation when cancel link is clicked", () => {
    const testOnEdit = jest.fn();
    const sensorA = createSensor(1);
    render(
      <SensorsList {...defaults} sensors={[sensorA]} onDelete={testOnEdit} />
    );
    const deleteButton = screen.getByText(/Löschen/gi);
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const confirmation = screen.getByText(/Bitte bestätige/gi);
    expect(confirmation).toBeInTheDocument();
    const cancelButton = screen.getByText(/Abbrechen/gi);
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(testOnEdit).not.toHaveBeenCalledWith(1);
    expect(screen.queryByText(/Bitte bestätige/gi)).not.toBeInTheDocument();
  });
  it("should render a new sensor link when empty", () => {
    render(<SensorsList {...defaults} sensors={[]} />);
    const firstButton = screen.getByText(/Ersten Sensor hinzufügen/gi);
    expect(firstButton).toBeInTheDocument();
    fireEvent.click(firstButton);
    const cancelButton = screen.getByText(/Abbrechen/gi);
    expect(cancelButton).toBeInTheDocument();
    const saveButton = screen.getByText(/Speichern/gi);
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    const firstButton2 = screen.getByText(/Ersten Sensor hinzufügen/gi);
    expect(firstButton2).toBeInTheDocument();
    fireEvent.click(firstButton2);
    const saveButton2 = screen.getByText(/Speichern/gi);
    expect(saveButton2).toBeInTheDocument();
    fireEvent.click(saveButton2);
  });
  it("should render a new sensor link when full", () => {
    const sensorA = createSensor(1);
    render(<SensorsList {...defaults} sensors={[sensorA]} />);
    const addButton = screen.getByText(/Sensor hinzufügen/gi);
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    const cancelButton = screen.getByText(/Abbrechen/gi);
    expect(cancelButton).toBeInTheDocument();
    const saveButton = screen.getByText(/Speichern/gi);
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(screen.queryByText(/Abbrechen/gi)).not.toBeInTheDocument();
    const addButton2 = screen.getByText(/Sensor hinzufügen/gi);
    expect(addButton2).toBeInTheDocument();
    fireEvent.click(addButton2);
    const saveButton2 = screen.getByText(/Speichern/gi);
    expect(saveButton2).toBeInTheDocument();
    fireEvent.click(saveButton2);
  });
  it("should call the onCancel when delete link is clicked", () => {
    render(<SensorsList {...defaults} sensors={[createSensor(1)]} />);

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const cancelButton1 = screen.getByText(/Abbrechen/gi);
    expect(cancelButton1).toBeInTheDocument();

    fireEvent.click(cancelButton1);

    const editButton2 = screen.getByText(/Bearbeiten/gi);
    expect(editButton2).toBeInTheDocument();

    const cancelButton2 = screen.queryByText(/Abbrechen/gi);
    expect(cancelButton2).not.toBeInTheDocument();
  });
  it("should show errors when empyt fields", () => {
    render(<SensorsList {...defaults} sensors={[createSensor(1)]} />);

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const [idInput, nameInput] = screen.getAllByRole("textbox");

    fireEvent.change(idInput, { target: { value: "" } });
    fireEvent.change(nameInput, { target: { value: "" } });

    const errors = screen.getAllByText(/Min. 3 Zeichen/gi);
    expect(errors).toHaveLength(2);
  });
  it("should update the draft when props change from outside", async (): Promise<void> => {
    const CustomWrapper: FC = () => {
      const [sensor, setSensor] = useState(createSensor(1));

      useEffect(() => {
        const to = setTimeout(
          () => setSensor({ ...sensor, name: "Hello" }),
          200
        );
        return () => clearTimeout(to);
      }, [setSensor, sensor]);

      return <SensorsList {...defaults} sensors={[sensor]} />;
    };
    render(<CustomWrapper />);

    const name = screen.getByText(/My sensor 1/gi);
    expect(name).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Hello/gi)).toBeInTheDocument()
    );
  });
  it("should not submit when the device Id field has an error", () => {
    const CustomWrapper: FC = () => {
      const sensor = {
        id: 124142,
        externalId: "",
        name: "My sensor 1",
        lastRecordedAt: null,
      };

      return <SensorsList {...defaults} sensors={[sensor]} />;
    };
    render(<CustomWrapper />);

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const saveButton1 = screen.getByText(/Speichern/gi);
    expect(saveButton1).toBeInTheDocument();

    const errorMsg1 = screen.getByText(/Min. 3 Zeichen/gi);
    expect(errorMsg1).toBeInTheDocument();

    fireEvent.click(saveButton1);

    // Nothing should have happend, things should be the same
    const saveButton2 = screen.getByText(/Speichern/gi);
    expect(saveButton2).toBeInTheDocument();

    const errorMsg2 = screen.getByText(/Min. 3 Zeichen/gi);
    expect(errorMsg2).toBeInTheDocument();
  });
  it("should not submit when the device Id field has an error", () => {
    const CustomWrapper: FC = () => {
      const sensor = {
        id: 124142,
        externalId: "my-sensor-1",
        name: "",
        lastRecordedAt: null,
      };

      return <SensorsList {...defaults} sensors={[sensor]} />;
    };
    render(<CustomWrapper />);

    const editButton1 = screen.getByText(/Bearbeiten/gi);
    expect(editButton1).toBeInTheDocument();

    fireEvent.click(editButton1);

    const saveButton1 = screen.getByText(/Speichern/gi);
    expect(saveButton1).toBeInTheDocument();

    const errorMsg1 = screen.getByText(/Min. 3 Zeichen/gi);
    expect(errorMsg1).toBeInTheDocument();

    fireEvent.click(saveButton1);

    // Nothing should have happend, things should be the same
    const saveButton2 = screen.getByText(/Speichern/gi);
    expect(saveButton2).toBeInTheDocument();

    const errorMsg2 = screen.getByText(/Min. 3 Zeichen/gi);
    expect(errorMsg2).toBeInTheDocument();
  });
});
