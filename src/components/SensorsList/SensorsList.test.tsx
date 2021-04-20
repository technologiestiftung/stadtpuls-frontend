import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { SensorsList } from ".";

const createSensor = (
  key: string,
  date?: Date | null
): {
  id: string;
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
    const sensorA = createSensor("A");
    const sensorB = createSensor("B");
    const sensorC = createSensor("C");
    const sensors = [sensorA, sensorB, sensorC];
    render(<SensorsList sensors={sensors} />);
    const titleA = screen.getByText(/My sensor A/i);
    const titleB = screen.getByText(/My sensor B/i);
    const titleC = screen.getByText(/My sensor C/i);
    expect(titleA).toBeInTheDocument();
    expect(titleB).toBeInTheDocument();
    expect(titleC).toBeInTheDocument();
  });
  it("should render the devices ids", () => {
    const sensorA = createSensor("A");
    const sensorB = createSensor("B");
    const sensorC = createSensor("C");
    const sensors = [sensorA, sensorB, sensorC];
    render(<SensorsList sensors={sensors} />);
    const deviceA = screen.getByText(/device-A/i);
    const deviceB = screen.getByText(/device-B/i);
    const deviceC = screen.getByText(/device-C/i);
    expect(deviceA).toBeInTheDocument();
    expect(deviceB).toBeInTheDocument();
    expect(deviceC).toBeInTheDocument();
  });
  it("should render relative dates based on lastRecordedAt", () => {
    const sensorA = createSensor("A", moment().subtract(3, "minutes").toDate());
    const sensorB = createSensor("B", moment().subtract(2, "days").toDate());
    const sensorC = createSensor("C", null);
    const sensors = [sensorA, sensorB, sensorC];
    render(<SensorsList sensors={sensors} />);
    const dateA = screen.getByText(/Vor 3 Minuten/i);
    const dateB = screen.getByText(/Vor 2 Tagen/i);
    const dateC = screen.getByText(/—/i);
    expect(dateA).toBeInTheDocument();
    expect(dateB).toBeInTheDocument();
    expect(dateC).toBeInTheDocument();
  });
  it("should call the onEdit when data is changed", () => {
    const testOnEdit = jest.fn();
    const sensorA = createSensor("A");

    render(<SensorsList sensors={[sensorA]} onChange={testOnEdit} />);

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
    render(<SensorsList sensors={[createSensor("A")]} />);

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
    render(<SensorsList sensors={[createSensor("A")]} />);

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
        <SensorsList sensors={[createSensor("A")]} />
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
        <SensorsList sensors={[createSensor("A")]} />
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
  it("should call the onDelete when delete link is clicked", () => {
    const testOnEdit = jest.fn();
    const sensorA = createSensor("A");
    render(<SensorsList sensors={[sensorA]} onDelete={testOnEdit} />);
    const editButton = screen.getByText(/Löschen/gi);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(testOnEdit).toHaveBeenCalledWith("A");
  });
  it("should call the onCancel when delete link is clicked", () => {
    render(<SensorsList sensors={[createSensor("A")]} />);

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
    render(<SensorsList sensors={[createSensor("A")]} />);

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
      const [sensor, setSensor] = useState(createSensor("A"));

      useEffect(() => {
        const to = setTimeout(
          () => setSensor({ ...sensor, name: "Hello" }),
          200
        );
        return () => clearTimeout(to);
      }, [setSensor, sensor]);

      return <SensorsList sensors={[sensor]} />;
    };
    render(<CustomWrapper />);

    const name = screen.getByText(/My sensor A/gi);
    expect(name).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Hello/gi)).toBeInTheDocument()
    );
  });
});
