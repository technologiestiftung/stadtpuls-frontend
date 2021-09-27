import { parsedAccounts } from "@mocks/supabaseData/accounts";
import { waitFor, fireEvent, screen, render } from "@testing-library/react";
import { UserInfoWithData } from "./withData";
import * as userDataHook from "@lib/hooks/useUserData";
import * as authHook from "@auth/Auth";
import * as nextRouter from "next/router";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";

const routeAccount: ParsedAccountType = parsedAccounts[1];
const loggedInAccount: ParsedAccountType = parsedAccounts[0];
const baseUserDataReturn = {
  isLoggedIn: false,
  user: null,
  error: null,
  createSensor: jest.fn().mockResolvedValue(100),
  updateUser: jest.fn().mockResolvedValue(true),
  deleteUser: jest.fn().mockResolvedValue(true),
};
const loggedInAccountData = {
  ...baseUserDataReturn,
  isLoggedIn: true,
  user: loggedInAccount,
};
const useUserData = jest.fn().mockReturnValue(baseUserDataReturn);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
userDataHook.useUserData = useUserData;
const useAuth = jest.fn().mockReturnValue({
  authenticatedUser: {
    id: loggedInAccountData.user.id,
    email: "contact@example.com",
  },
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
authHook.useAuth = useAuth;

const routerPush = jest.fn();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  push: routerPush,
});

describe("Tabs", () => {
  it("renders no Tokens tab if logged out", () => {
    useUserData.mockReturnValue(baseUserDataReturn);
    render(
      <UserInfoWithData routeAccount={routeAccount} activeTab='sensors' />
    );

    const tabs = screen.getAllByRole("tab");
    const tokensTab = screen.queryByRole("tab", {
      name: "Tokens",
    });
    const sensorsTab = screen.queryByRole("tab", {
      name: "Sensoren",
    });
    expect(tabs.length).toBe(1);
    expect(sensorsTab).toBeInTheDocument();
    expect(tokensTab).not.toBeInTheDocument();
  });
  it("renders the Tokens tab if logged in and same as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const tabs = screen.getAllByRole("tab");
    const tokensTab = screen.queryByRole("tab", {
      name: "Tokens",
    });
    const sensorsTab = screen.queryByRole("tab", {
      name: "Sensoren",
    });
    expect(tabs.length).toBe(2);
    expect(sensorsTab).toBeInTheDocument();
    expect(tokensTab).toBeInTheDocument();
  });

  it("renders no Tokens tab if logged in and not same as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <UserInfoWithData routeAccount={routeAccount} activeTab='sensors' />
    );

    const tabs = screen.getAllByRole("tab");
    const tokensTab = screen.queryByRole("tab", {
      name: "Tokens",
    });
    const sensorsTab = screen.queryByRole("tab", {
      name: "Sensoren",
    });
    expect(tabs.length).toBe(1);
    expect(sensorsTab).toBeInTheDocument();
    expect(tokensTab).not.toBeInTheDocument();
  });
});

describe("UserInfoHeader", () => {
  it("renders no Edit Profile button if logged out", () => {
    useUserData.mockReturnValue(baseUserDataReturn);
    render(
      <UserInfoWithData routeAccount={routeAccount} activeTab='sensors' />
    );

    const editButton = screen.queryByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).not.toBeInTheDocument();
  });
  it("renders no Edit Profile button if logged in and not same user as route", () => {
    useUserData.mockReturnValue(baseUserDataReturn);
    render(
      <UserInfoWithData routeAccount={routeAccount} activeTab='sensors' />
    );

    const editButton = screen.queryByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).not.toBeInTheDocument();
  });
  it("renders a Edit Profile button if logged in and same user as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const editButton = screen.queryByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).toBeInTheDocument();
  });
  it("click on Edit Profile button opens modal", async (): Promise<void> => {
    const customUpdateUser = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      updateUser: customUpdateUser,
    });
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const editButton = screen.getByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // DESCRPTION INPUT
    const descField = screen.getByRole("textbox", {
      name: "Beschreibung (Optional)",
    });
    expect(descField).toBeInTheDocument();

    fireEvent.change(descField, {
      target: { value: "My new profile description" },
    });

    // SUBMIT FORM
    const form = document.querySelector("form");
    if (!form) throw "From element was not found";
    fireEvent.submit(form);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Profil editieren" });
      expect(title).not.toBeInTheDocument();

      expect(customUpdateUser).toHaveBeenCalledWith({
        description: "My new profile description",
        email: "contact@example.com",
        displayName: loggedInAccount.displayName,
        id: loggedInAccount.id,
        link: loggedInAccount.link,
        username: loggedInAccount.username,
      });
    });
  });
  it("Edit Profile modal closes when cancelled", async (): Promise<void> => {
    const customUpdateUser = jest.fn().mockResolvedValue(true);
    const customDeleteUser = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      updateUser: customUpdateUser,
      deleteUser: customDeleteUser,
    });
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const editButton = screen.getByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // CANCEL BUTTON
    const cancelButton = screen.getByRole("button", { name: "Abbrechen" });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Profil editieren" });
      expect(title).not.toBeInTheDocument();
      expect(customDeleteUser).not.toHaveBeenCalled();
      expect(customUpdateUser).not.toHaveBeenCalled();
    });
  });
  it("click on delete account opens deletion modal", async (): Promise<void> => {
    const customDeleteUser = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      deleteUser: customDeleteUser,
    });
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const editButton = screen.getByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // DELETE BUTTON
    const deleteButton = screen.getByRole("button", { name: "Löschen" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      // FORM MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Account löschen" });
      expect(title).toBeInTheDocument();
      expect(customDeleteUser).not.toHaveBeenCalled();
    });

    // CANCEL BUTTON
    const [, cancelButton2] = screen.getAllByRole("button", {
      name: "Abbrechen",
    });
    expect(cancelButton2).toBeInTheDocument();

    fireEvent.click(cancelButton2);

    await waitFor(() => {
      // DELETION MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Account löschen" });
      expect(title).not.toBeInTheDocument();
    });

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // DELETE BUTTON
    const deleteButton2 = screen.getByRole("button", { name: "Löschen" });
    expect(deleteButton2).toBeInTheDocument();

    fireEvent.click(deleteButton2);

    // DELETE CONFIRMATION BUTTON
    const deleteConfirmationButton = screen.getByRole("button", {
      name: "Unwiderruflich löschen",
    });
    expect(deleteConfirmationButton).toBeInTheDocument();

    fireEvent.click(deleteConfirmationButton);

    await waitFor(() => {
      expect(customDeleteUser).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith("/");
    });

    // DELETION MODAL TITLE
    const deletionModalTitle = screen.queryByRole("heading", {
      name: "Account löschen",
    });
    expect(deletionModalTitle).not.toBeInTheDocument();
    // FORM MODAL TITLE
    const formModalTitle = screen.queryByRole("heading", {
      name: "Profil editieren",
    });
    expect(formModalTitle).not.toBeInTheDocument();
  });
});

describe("EditAddSensorModal", () => {
  it("renders no Add Sensor button if logged out", () => {
    useUserData.mockReturnValue(baseUserDataReturn);
    render(
      <UserInfoWithData routeAccount={routeAccount} activeTab='sensors' />
    );

    const addSensorButton = screen.queryByRole("button", {
      name: "+ Neuer Sensor",
    });
    expect(addSensorButton).not.toBeInTheDocument();
  });
  it("renders no Add Sensor button if logged in and not same user as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <UserInfoWithData routeAccount={routeAccount} activeTab='sensors' />
    );

    const addSensorButton = screen.queryByRole("button", {
      name: "+ Neuer Sensor",
    });
    expect(addSensorButton).not.toBeInTheDocument();
  });
  it("renders a Add Sensor button if logged in and same user as route", () => {
    useUserData.mockReturnValue(loggedInAccountData);
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const addSensorButton = screen.queryByRole("button", {
      name: "+ Neuer Sensor",
    });
    expect(addSensorButton).toBeInTheDocument();
  });
  it("click on Add Sensor button opens modal", async (): Promise<void> => {
    const customCreateSensor = jest.fn().mockResolvedValue(100);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      createSensor: customCreateSensor,
    });
    const newSensor: Omit<
      ParsedSensorType,
      "parsedRecords" | "id" | "createdAt"
    > = {
      name: "My test sensor",
      symbolId: 14,
      description: "This is my new sensor",
      categoryId: 1,
      categoryName: "CO2",
      connectionType: "http",
      latitude: 1,
      longitude: 2,
      authorId: loggedInAccount.id,
      authorName: loggedInAccount.displayName,
      authorUsername: loggedInAccount.username,
    };
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    // NEW SENSOR BUTTON
    const addSensorButton = screen.getByRole("button", {
      name: "+ Neuer Sensor",
    });
    expect(addSensorButton).toBeInTheDocument();

    fireEvent.click(addSensorButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", {
        name: "Neuer Sensor hinzufügen",
      });
      expect(title).toBeInTheDocument();
    });

    // NAME INPUT
    const nameField = screen.getByRole("textbox", { name: "Name" });
    expect(nameField).toBeInTheDocument();

    fireEvent.change(nameField, {
      target: { value: newSensor.name },
    });

    // SENSOR ICON SELECT
    const sensorIconField = screen.getByRole("button", {
      name: "Symbol Symbol",
    });
    expect(sensorIconField).toBeInTheDocument();

    fireEvent.click(sensorIconField);

    await waitFor(() => {
      const sensorIconOptions = screen.getAllByRole("option");
      expect(sensorIconOptions[13]).toBeInTheDocument();
      fireEvent.click(sensorIconOptions[13]);
    });

    // DESCRIPTION TEXTAREA
    const descField = screen.getByRole("textbox", {
      name: "Beschreibung (Optional)",
    });
    expect(descField).toBeInTheDocument();

    fireEvent.change(descField, {
      target: { value: newSensor.description },
    });

    // CATEGORY SELECT
    const categoryField = screen.getByRole("button", {
      name: "Kategorie Wähle eine Kategorie",
    });
    expect(categoryField).toBeInTheDocument();

    fireEvent.click(categoryField);

    const categoriesOptions = screen.getAllByRole("option");
    expect(categoriesOptions[0]).toBeInTheDocument();

    fireEvent.click(categoriesOptions[0]);

    // LATITUDE INPUT
    const latField = screen.getByRole("spinbutton", { name: "Latitude" });
    expect(latField).toBeInTheDocument();

    fireEvent.change(latField, {
      target: { value: newSensor.latitude },
    });

    // LONGITUDE INPUT
    const lngField = screen.getByRole("spinbutton", { name: "Longitude" });
    expect(lngField).toBeInTheDocument();

    fireEvent.change(lngField, {
      target: { value: newSensor.longitude },
    });

    // SUBMIT FORM
    const form = document.querySelector("form");
    if (!form) throw "From element was not found";
    fireEvent.submit(form);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Profil editieren" });
      expect(title).not.toBeInTheDocument();

      expect(customCreateSensor).toHaveBeenCalled();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const functionArg = customCreateSensor?.mock
        ?.calls[0][0] as typeof newSensor;
      expect(functionArg).toMatchObject(newSensor);
    });
  });
  it("Edit Profile modal closes when cancelled", async (): Promise<void> => {
    const customUpdateUser = jest.fn().mockResolvedValue(true);
    const customDeleteUser = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      updateUser: customUpdateUser,
      deleteUser: customDeleteUser,
    });
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const editButton = screen.getByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // CANCEL BUTTON
    const cancelButton = screen.getByRole("button", { name: "Abbrechen" });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Profil editieren" });
      expect(title).not.toBeInTheDocument();
      expect(customDeleteUser).not.toHaveBeenCalled();
      expect(customUpdateUser).not.toHaveBeenCalled();
    });
  });
  it("click on delete account opens deletion modal", async (): Promise<void> => {
    const customDeleteUser = jest.fn().mockResolvedValue(true);
    useUserData.mockReturnValue({
      ...loggedInAccountData,
      deleteUser: customDeleteUser,
    });
    render(
      <UserInfoWithData routeAccount={loggedInAccount} activeTab='sensors' />
    );

    const editButton = screen.getByRole("button", {
      name: "Account editieren",
    });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // DELETE BUTTON
    const deleteButton = screen.getByRole("button", { name: "Löschen" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      // FORM MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Account löschen" });
      expect(title).toBeInTheDocument();
      expect(customDeleteUser).not.toHaveBeenCalled();
    });

    // CANCEL BUTTON
    const [, cancelButton2] = screen.getAllByRole("button", {
      name: "Abbrechen",
    });
    expect(cancelButton2).toBeInTheDocument();

    fireEvent.click(cancelButton2);

    await waitFor(() => {
      // DELETION MODAL TITLE
      const title = screen.queryByRole("heading", { name: "Account löschen" });
      expect(title).not.toBeInTheDocument();
    });

    fireEvent.click(editButton);

    await waitFor(() => {
      // MODAL TITLE
      const title = screen.getByRole("heading", { name: "Profil editieren" });
      expect(title).toBeInTheDocument();
    });

    // DELETE BUTTON
    const deleteButton2 = screen.getByRole("button", { name: "Löschen" });
    expect(deleteButton2).toBeInTheDocument();

    fireEvent.click(deleteButton2);

    // DELETE CONFIRMATION BUTTON
    const deleteConfirmationButton = screen.getByRole("button", {
      name: "Unwiderruflich löschen",
    });
    expect(deleteConfirmationButton).toBeInTheDocument();

    fireEvent.click(deleteConfirmationButton);

    await waitFor(() => {
      expect(customDeleteUser).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith("/");
    });

    // DELETION MODAL TITLE
    const deletionModalTitle = screen.queryByRole("heading", {
      name: "Account löschen",
    });
    expect(deletionModalTitle).not.toBeInTheDocument();
    // FORM MODAL TITLE
    const formModalTitle = screen.queryByRole("heading", {
      name: "Profil editieren",
    });
    expect(formModalTitle).not.toBeInTheDocument();
  });
});
