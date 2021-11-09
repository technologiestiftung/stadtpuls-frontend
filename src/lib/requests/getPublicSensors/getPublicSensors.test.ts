import { rest } from "msw";
import { setupServer } from "msw/node";
import { errors, getPublicSensors } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";
import { sensors as exampleSensors } from "@mocks/supabaseData/sensors";
import { SensorQueryResponseType } from "@lib/hooks/usePublicSensors";

const getIndexesFromRange = (
  rangeStart: number,
  rangeEnd: number
): { fromIndex: number; toIndex: number } => {
  return {
    fromIndex: rangeStart - 1,
    toIndex: rangeEnd - 1,
  };
};

describe("utility function getPublicSensors", () => {
  it("returns all public sensors", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(exampleSensors));
      })
    );
    server.listen();
    const fetchedSensors = await getPublicSensors();
    expect(fetchedSensors.length).toEqual(exampleSensors.length);
    server.resetHandlers();
    server.close();
  });

  it("returns a limited amount of sensors if range is provided", async (): Promise<void> => {
    const rangeStart = 2;
    const rangeEnd = 5;
    let filteredSensors: SensorQueryResponseType[] = [];

    const server = setupServer(
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        const { fromIndex, toIndex } = getIndexesFromRange(
          rangeStart,
          rangeEnd
        );
        filteredSensors = exampleSensors.filter((_, index) => {
          return index >= fromIndex && index <= toIndex;
        });

        return res(ctx.status(200, "Mocked status"), ctx.json(filteredSensors));
      })
    );
    server.listen();

    const fetchedSensors = await getPublicSensors({ rangeStart, rangeEnd });
    expect(fetchedSensors.length).toEqual(filteredSensors.length);

    const expectedSensorIds = filteredSensors.map(sensor => sensor.id);
    const allReturnedIdsAreIncludedInExpectedIds = fetchedSensors.every(
      sensor => expectedSensorIds.includes(sensor.id)
    );
    expect(allReturnedIdsAreIncludedInExpectedIds).toBe(true);

    server.resetHandlers();
    server.close();
  });

  it("errors when rangeEnd is greater than rangeStart", async (): Promise<void> => {
    const rangeStart = 3;
    const rangeEnd = 2;

    // No mock server needed because we're throwing early

    try {
      await getPublicSensors({ rangeStart, rangeEnd });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual(
        errors.rangeEndGreaterThanRangeStart
      );
    }
  });

  it("errors when rangeEnd is provided without rangeStart", async (): Promise<void> => {
    const rangeEnd = 3;

    // No mock server needed because we're throwing early

    try {
      await getPublicSensors({ rangeEnd });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual(errors.onlyOneRangeValue);
    }
  });
});
