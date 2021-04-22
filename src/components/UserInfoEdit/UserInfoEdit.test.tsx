import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserInfoEdit } from ".";

describe("component UserInfoEdit", () => {
  const testEmail = "johndoe@aol.com";
  const testUsername = "johndoe";

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
    const submitButton = screen.getByDisplayValue("Speichern");
    const usernameInput = screen.getByDisplayValue(testUsername);

    fireEvent.change(usernameInput, {
      target: {
        value: "janedoe",
      },
    });
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mySubmit).toHaveBeenCalledWith({
        username: "janedoe",
      })
    );
  });
});
