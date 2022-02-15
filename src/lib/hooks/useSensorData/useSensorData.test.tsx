import { renderHook } from "@testing-library/react-hooks";
import { useSensorData } from ".";

describe("useSensorRecords hook", () => {
  test("should return the requested sensor", async (): Promise<void> => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSensorData({ sensorId: 1 })
    );

    expect(result.current.sensor).toBeNull();

    await waitForNextUpdate();

    expect(result.current.sensor).toMatchObject({ id: 1 });
  });
});
