import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserInfoEdit } from ".";
import * as verifyUser from "@lib/requests/isUsernameAlreadyTaken";

const originalUserVerifFunction = verifyUser.isUsernameAlreadyTaken;

describe("component UserInfoEdit", () => {
  const testEmail = "johndoe@aol.com";
  const testUsername = "johndoe";

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    verifyUser.isUsernameAlreadyTaken = jest.fn().mockResolvedValue(false);
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    verifyUser.isUsernameAlreadyTaken = originalUserVerifFunction;
  });

  it("should render an username input", () => {
    render(<UserInfoEdit email={testEmail} username={testUsername} />);
    const usernameLabel = screen.getByText(/Nutzername/i);
    const usernameInput = screen.getByDisplayValue(testUsername);
    expect(usernameLabel).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render an email input", () => {
    render(<UserInfoEdit email={testEmail} username={testUsername} />);
    const emailLabel = screen.getByText(/E-Mail/i);
    const emailInput = screen.getByDisplayValue(testEmail);
    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  it("should call the onSubmit handler on submit", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(
      <UserInfoEdit
        email={testEmail}
        username={testUsername}
        onSubmit={mySubmit}
      />
    );
    const editButton = screen.getByText("Ändern");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const usernameInput = screen.getByDisplayValue(testUsername);

    fireEvent.change(usernameInput, {
      target: {
        value: "vogelino",
      },
    });

    const submitButton = screen.getByDisplayValue("Speichern");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mySubmit).toHaveBeenCalledWith({
        email: testEmail,
        username: "vogelino",
      });
    });
  });
  it("should not call the onSubmit handler when username already exists", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(
      <UserInfoEdit
        email={testEmail}
        username={testUsername}
        onSubmit={mySubmit}
      />
    );
    const editButton = screen.getByText("Ändern");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const submitButton = screen.getByDisplayValue("Speichern");
    const usernameInput = screen.getByDisplayValue(testUsername);

    fireEvent.change(usernameInput, {
      target: {
        value: "vogelino",
      },
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mySubmit).not.toHaveBeenCalled(), {
      timeout: 300,
    });
  });
  it("should throw an error and not submit with an invalid email", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(
      <UserInfoEdit
        email={testEmail}
        username={testUsername}
        onSubmit={mySubmit}
      />
    );

    const editButton = screen.getByText("Ändern");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);

    const submitButton = screen.getByDisplayValue("Speichern");
    const emailInput = screen.getByDisplayValue(testEmail);

    fireEvent.change(emailInput, {
      target: {
        value: "invalid_email",
      },
    });

    fireEvent.click(submitButton);
    await waitFor(() => {
      const emailError = screen.getByText(
        "Die angegebene E-Mail Adresse ist ungültig"
      );
      expect(emailError).toBeInTheDocument();
      expect(mySubmit).not.toHaveBeenCalled();
    });
  });
  it("should throw an error and not submit with an invalid username", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(
      <UserInfoEdit
        email={testEmail}
        username={testUsername}
        onSubmit={mySubmit}
      />
    );

    const editButton = screen.getByText("Ändern");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);

    const submitButton = screen.getByDisplayValue("Speichern");
    const usernameInput = screen.getByDisplayValue(testUsername);

    fireEvent.change(usernameInput, {
      target: {
        value: "poggers!1!",
      },
    });

    fireEvent.click(submitButton);
    await waitFor(() => {
      const usernameError = screen.getByText(
        "Nutzernamen dürfen nur Buchstaben, Zahlen und _ enthalten"
      );
      expect(usernameError).toBeInTheDocument();
      expect(mySubmit).not.toHaveBeenCalled();
    });
  });
  it("should reset the form when changes are canceled", async (): Promise<void> => {
    render(<UserInfoEdit email={testEmail} username={testUsername} />);

    const editButton = screen.getByText("Ändern");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);

    const cancelButton = screen.getByText("Abbrechen");

    const usernameInput = screen.getByDisplayValue(testUsername);
    const emailInput = screen.getByDisplayValue(testEmail);

    fireEvent.change(usernameInput, {
      target: {
        value: "poggers!1!",
      },
    });
    fireEvent.change(emailInput, {
      target: {
        value: "invalid_email",
      },
    });

    fireEvent.click(cancelButton);

    await waitFor(() => {
      const usernameInput = screen.getByDisplayValue(testUsername);
      const emailInput = screen.getByDisplayValue(testEmail);
      expect(usernameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });
  });
});
