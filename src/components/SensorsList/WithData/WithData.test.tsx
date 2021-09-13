import { DevicesType } from "@common/types/supabase_DEPRECATED";
import moment from "moment";
import { render, screen } from "@testing-library/react";
import { SensorsListWithData as SensorsList } from ".";

const defaults = {
  onChange: jest.fn(),
  onAdd: jest.fn(),
  onDelete: jest.fn(),
  projectId: 1,
};
const createSensor = (key: number): DevicesType => ({
  id: key,
  externalId: `device-${key}`,
  name: `My sensor ${key}`,
  projectId: defaults.projectId,
  records: [
    {
      id: 1,
      deviceId: key,
      recordedAt: moment().subtract(20, "minutes").toISOString(),
    },
    {
      id: 2,
      deviceId: key,
      recordedAt: moment().subtract(10, "minutes").toISOString(),
    },
    {
      id: 3,
      deviceId: key,
      recordedAt: moment().subtract(5, "minutes").toISOString(),
    },
  ],
});

describe("component SensorsListWithData", () => {
  it("returns the most recent date", () => {
    render(<SensorsList {...defaults} devices={[createSensor(1)]} />);
    const lastRecordedAt = screen.getByText(/Vor 5 Minuten/i);
    expect(lastRecordedAt).toBeInTheDocument();

    expect(screen.queryByText(/Vor 10 Minuten/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Vor 20 Minuten/i)).not.toBeInTheDocument();
  });
});
