import { parsedAccounts } from "@mocks/supabaseData/accounts";
import { waitFor, fireEvent, screen, render } from "@testing-library/react";
import { SensorPageHeaderWithData } from "./withData";
import * as userDataHook from "@lib/hooks/useUserData";
import * as nextRouter from "next/router";
import { mapPublicSensor, ParsedSensorType } from "@lib/hooks/usePublicSensors";
import * as categoriesHook from "@lib/hooks/useSensorCategories";
import { categories } from "@mocks/supabaseData/categories";
import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";
import { httpSensors, ttnSensors } from "@mocks/supabaseData/sensors";

const routeAccount: AccountWithSensorsType = {
  ...parsedAccounts[1],
  sensors: httpSensors.map(mapPublicSensor),
};
const loggedInAccount: AccountWithSensorsType = {
  ...parsedAccounts[0],
  sensors: ttnSensors.map(mapPublicSensor),
};
const baseUserDataReturn = {
  isLoggedIn: false,
  user: null,
  error: null,
  sensors: [],
  updateSensor: jest.fn().mockResolvedValue(true),
  deleteSensor: jest.fn().mockResolvedValue(true),
};
const loggedInAccountData = {
  ...baseUserDataReturn,
  sensors: loggedInAccount.sensors.map(s => ({
    ...s,
    authorId: loggedInAccount.id,
    authorName: loggedInAccount.displayName,
    authorUsername: loggedInAccount.username,
  })),
  isLoggedIn: true,
  user: loggedInAccount,
};
const useUserData = jest.fn().mockReturnValue(baseUserDataReturn);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
userDataHook.useUserData = useUserData;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
categoriesHook.useSensorCategories = jest.fn().mockReturnValue({
  categories,
  isLoading: false,
  error: null,
});

const routerPush = jest.fn();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  push: routerPush,
});

describe("EditAddSensorModal", () => {
  it("renders no Edit Sensor button if logged out", () => {
    useUserData.mockReturnValue(baseUserDataReturn);
    render(
      <SensorPageHeaderWithData initialSensor={routeAccount.sensors[0]} />
    );

    const editSensorButton = screen.queryByRole("button", {
      name: "Sensor editieren",
    });
    expect(editSensorButton).not.toBeInTheDocument();
  });
  it("renders no Edit Sensor button if logged in and not same user as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <SensorPageHeaderWithData initialSensor={routeAccount.sensors[0]} />
    );

    const editSensorButton = screen.queryByRole("button", {
      name: "Sensor editieren",
    });
    expect(editSensorButton).not.toBeInTheDocument();
  });
  it("renders a Edit Sensor button if logged in and same user as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <SensorPageHeaderWithData initialSensor={loggedInAccount.sensors[0]} />
    );

    const editSensorButton = screen.queryByRole("button", {
      name: "Sensor editieren",
    });
    expect(editSensorButton).toBeInTheDocument();
  });
  it("click on Edit Sensor button opens modal", async (): Promise<void> => {
    const customUpdateSensor = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      updateSensor: customUpdateSensor,
    });
    const editedSensor: Omit<
      ParsedSensorType,
      "parsedRecords" | "id" | "createdAt"
    > = {
      name: "My test sensor",
      symbolId: loggedInAccount.sensors[0].symbolId,
      description: loggedInAccount.sensors[0].description,
      categoryId: loggedInAccount.sensors[0].categoryId,
      categoryName: loggedInAccount.sensors[0].categoryName,
      connectionType: loggedInAccount.sensors[0].connectionType,
      latitude: loggedInAccount.sensors[0].latitude,
      longitude: loggedInAccount.sensors[0].longitude,
      authorId: loggedInAccount.id,
      authorName: loggedInAccount.displayName,
      authorUsername: loggedInAccount.username,
    };
    render(
      <SensorPageHeaderWithData initialSensor={loggedInAccount.sensors[0]} />
    );

    // NEW SENSOR BUTTON
    const editSensorButton = screen.getByRole("button", {
      name: "Sensor editieren",
    });
    expect(editSensorButton).toBeInTheDocument();

    fireEvent.click(editSensorButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", {
        name: `Sensor ???${loggedInAccount.sensors[0].name}??? editieren`,
      });
      expect(title).toBeInTheDocument();
    });

    // NAME INPUT
    const nameField = screen.getByRole("textbox", { name: "Name" });
    expect(nameField).toBeInTheDocument();

    fireEvent.change(nameField, {
      target: { value: editedSensor.name },
    });

    // SUBMIT FORM
    const form = document.querySelector("form");
    if (!form) throw "From element was not found";
    fireEvent.submit(form);

    await waitFor(() => {
      expect(customUpdateSensor).toHaveBeenCalled();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const functionArg = customUpdateSensor?.mock
        ?.calls[0][0] as typeof editedSensor;
      expect(functionArg).toMatchObject(editedSensor);
    });

    await waitFor(() => {
      // MODAL TITLE
      const successMsg = screen.getByText(
        `Dein Sensor ist erfolgreich editiert worden!`
      );
      expect(successMsg).toBeInTheDocument();
    });
  });
  it("click on delete sensor opens deletion modal", async (): Promise<void> => {
    const customUpdateSensor = jest.fn().mockResolvedValue(true);
    const customDeleteSensor = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      updateSensor: customUpdateSensor,
      deleteSensor: customDeleteSensor,
    });
    render(
      <SensorPageHeaderWithData initialSensor={loggedInAccount.sensors[0]} />
    );

    // NEW SENSOR BUTTON
    const editSensorButton = screen.getByRole("button", {
      name: "Sensor editieren",
    });
    expect(editSensorButton).toBeInTheDocument();

    fireEvent.click(editSensorButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", {
        name: `Sensor ???${loggedInAccount.sensors[0].name}??? editieren`,
      });
      expect(title).toBeInTheDocument();
    });

    // DELETE BUTTON
    const deleteButton = screen.getByRole("button", { name: "L??schen" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      // DELETE MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Sensor l??schen" });
      expect(title).toBeInTheDocument();
      expect(customDeleteSensor).not.toHaveBeenCalled();
    });

    // CANCEL BUTTON
    const [, cancelButton2] = screen.getAllByRole("button", {
      name: "Abbrechen",
    });
    expect(cancelButton2).toBeInTheDocument();

    fireEvent.click(cancelButton2);

    await waitFor(() => {
      // DELETION MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Sensor l??schen" });
      expect(title).not.toBeInTheDocument();
    });

    fireEvent.click(editSensorButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", {
        name: `Sensor ???${loggedInAccount.sensors[0].name}??? editieren`,
      });
      expect(title).toBeInTheDocument();
    });

    // DELETE BUTTON
    const deleteButton2 = screen.getByRole("button", { name: "L??schen" });
    expect(deleteButton2).toBeInTheDocument();

    fireEvent.click(deleteButton2);

    // DELETE CONFIRMATION BUTTON
    const deleteConfirmationButton = screen.getByRole("button", {
      name: "Unwiderruflich l??schen",
    });
    expect(deleteConfirmationButton).toBeInTheDocument();

    fireEvent.click(deleteConfirmationButton);

    await waitFor(() => {
      expect(customDeleteSensor).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith(
        `/${loggedInAccount.username}/sensors`
      );
    });

    // DELETION MODAL TITLE
    const deletionModalTitle = screen.queryByRole("heading", {
      name: "Sensor l??schen",
    });
    expect(deletionModalTitle).not.toBeInTheDocument();
    // FORM MODAL TITLE
    const formModalTitle = screen.queryByRole("heading", {
      name: `Sensor ???${loggedInAccount.sensors[0].name}??? editieren`,
    });
    expect(formModalTitle).not.toBeInTheDocument();
  });
});
