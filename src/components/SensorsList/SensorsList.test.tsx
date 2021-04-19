import { fireEvent, render, screen } from "@testing-library/react";
import moment from "moment";
import { SensorsList } from ".";

const createSensor = (
  key: string,
  date?: Date | null
): {
  id: string;
  name: string;
  lastRecordedAt: Date | null;
} => ({
  id: key,
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
  it("should call the onEdit when edit link is clicked", () => {
    const testOnEdit = jest.fn();
    const sensorA = createSensor("A");
    render(<SensorsList sensors={[sensorA]} onEdit={testOnEdit} />);
    const editButton = screen.getByText(/Bearbeiten/gi);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(testOnEdit).toHaveBeenCalledWith("A");
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
});
