import { AuthProvider } from "@auth/Auth";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { act as renderAct, render, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { FC, useEffect } from "react";
import { SWRConfig } from "swr";
import { useSensorRecords } from ".";
import format from "pg-format";
import { getSensorRecords } from "@mocks/supabaseData/records";
import { programaticSignup } from "@lib/testUtil";
import {
  closePool,
  openPool,
  getClient,
} from "@technologiestiftung/stadtpuls-test-utils";

type OnSuccessType = (data: definitions["records"][]) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  sensorId: number | undefined,
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { records, error, isLoading } = useSensorRecords({
      sensorId,
      startDateString: "2021-09-08T20:09:12.000-02:00",
      endDateString: "2021-10-13T22:39:10.000-02:00",
    });
    useEffect(() => {
      if (records && !error && !isLoading) onSuccess(records);
      if (error) onFail(error.message);
    }, [records, error, isLoading]);
    return <div />;
  };
  return TestComponent;
};

describe("useSensorRecords hook", () => {
  test("should return an empty array if no sensorId", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: definitions["records"][]): void => {
      onSuccess(data);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(
      undefined,
      onSuccessWrapper,
      onError
    );
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith([]);
      expect(onError).not.toHaveBeenCalled();
    });
  });
  test("should return an array of records with sensorId", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: definitions["records"][]): void => {
      onSuccess(data.length > 0);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(1, onSuccessWrapper, onError);
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(true);
      expect(onError).not.toHaveBeenCalled();
    });
  });

  let client: Awaited<ReturnType<typeof getClient>> | undefined;
  describe("deleteRecords", () => {
    beforeAll(async () => {
      await openPool(
        "postgresql://postgres:your-super-secret-and-long-postgres-password@localhost/postgres?statusColor=F8F8F8&enviroment=production&name=Local%20Stadtpuls%20Supabase%20DB&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0&driverVersion=0"
      );
      client = await getClient();
    });

    afterAll(async () => {
      await closePool();
    });

    it("deletes records", async () => {
      if (!client) throw new Error("client is undefined");

      // Create test data in the DB
      const parentSensorId = 4;
      const records = getSensorRecords({
        sensorId: parentSensorId,
        numberOfRecords: 10,
      });
      const values = records.map(record => [
        record.sensor_id,
        record.recorded_at,
        `{ ${record.measurements.join(", ")} }`,
      ]);
      const addRecrodsQuery = format(
        `INSERT INTO records (sensor_id, recorded_at, measurements) VALUES %L`,
        values
      );
      await client.query(addRecrodsQuery);

      // Login user
      const session = await programaticSignup({
        email: "test@email.com",
        password: "password",
      });
      const LocalHookWrapper: FC = ({ children }) => (
        <AuthProvider session={session}>{children}</AuthProvider>
      );

      // Render hook
      const { result, waitForNextUpdate } = renderHook(
        () => useSensorRecords({ sensorId: parentSensorId }),
        {
          wrapper: LocalHookWrapper,
        }
      );

      const getRecordsQuery = `SELECT * FROM records WHERE sensor_id = $1`;

      const recordsIds = (
        await client.query(getRecordsQuery, [parentSensorId])
      ).rows.map(({ id }) => id as number);

      await waitForNextUpdate();

      await renderAct(() => result.current.deleteRecords(recordsIds));

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
      const recordsCount = (
        await client.query(getRecordsQuery, [parentSensorId])
      ).rowCount;

      await waitFor(() => {
        expect(recordsCount).toBe(0);
      });
    });
    it("fails when no ids are provided", async () => {
      const parentSensorId = 4;

      // Login user
      const session = await programaticSignup({
        email: "test@email.com",
        password: "password",
      });
      const LocalHookWrapper: FC = ({ children }) => (
        <AuthProvider session={session}>{children}</AuthProvider>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useSensorRecords({ sensorId: parentSensorId }),
        {
          wrapper: LocalHookWrapper,
        }
      );

      await waitForNextUpdate();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await renderAct(async () => await result.current.deleteRecords());

      await waitFor(() => {
        expect(result.current.error?.message).toBe(
          "To delete records please provide a sensor id and record ids"
        );
      });
    });
  });
});
