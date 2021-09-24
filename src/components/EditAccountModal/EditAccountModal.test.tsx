import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { EditAccountModal } from ".";

const baseTestData = {
  onDelete: jest.fn(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  defaultValues: {
    id: "1",
    username: "vogelino",
    email: "contact@vogelino.com",
    displayName: "Vogelino",
    description: "I am a cat",
    link: "https://vogelino.com",
    createdAt: "2021-01-01T00:00:00.000Z",
    categories: [1, 2],
    sensorsCount: 1234,
    recordsCount: 1234567,
  },
};

describe("EditAccountModal component", () => {
  it("should render correctly", () => {
    render(<EditAccountModal {...baseTestData} />);

    // MODAL TITLE
    const title = screen.getByRole("heading", { name: "Profil editieren" });
    expect(title).toBeInTheDocument();

    // NAME INPUT
    const nameLabel = screen.getByText("Nutzername");
    expect(nameLabel).toBeInTheDocument();

    const nameField = screen.getByRole("textbox", { name: "Nutzername" });
    expect(nameField).toBeInTheDocument();

    // EMAIL INPUT
    const emailLabel = screen.getByText("E-Mail-Addresse");
    expect(emailLabel).toBeInTheDocument();

    const emailField = screen.getByRole("textbox", {
      name: "E-Mail-Addresse",
    });
    expect(emailField).toBeInTheDocument();

    // DESCRIPTION TEXTAREA
    const descLabel = screen.getByText("Beschreibung");
    expect(descLabel).toBeInTheDocument();

    const descField = screen.getByRole("textbox", {
      name: "Beschreibung (Optional)",
    });
    expect(descField).toBeInTheDocument();

    // LINK INPUT
    const linkLabel = screen.getByText("Link");
    expect(linkLabel).toBeInTheDocument();

    const linkField = screen.getByRole("textbox", {
      name: "Link (Optional)",
    });
    expect(linkField).toBeInTheDocument();
  });
  it("should call the appropriate handlers when buttons clicked", async (): Promise<void> => {
    render(<EditAccountModal {...baseTestData} />);

    const deleteButton = screen.getByRole("button", { name: "Löschen" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(baseTestData.onDelete).toHaveBeenCalled();

    const cancelButton = screen.getByRole("button", { name: "Abbrechen" });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(baseTestData.onCancel).toHaveBeenCalled();

    const submitButton = screen.getByRole("button", { name: "Speichern" });
    expect(submitButton).toBeInTheDocument();

    const form = document.querySelector("form");
    if (!form) throw "From element was not found";
    fireEvent.submit(form);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(baseTestData.onSubmit).toHaveBeenCalled();
    });
  });
  it("should set focus on name field after", async (): Promise<void> => {
    render(<EditAccountModal {...baseTestData} />);

    const nameField = screen.getByRole("textbox", { name: "Anzeigename" });
    expect(nameField).toBeInTheDocument();

    await waitFor(
      () => {
        expect(nameField).toHaveFocus();
      },
      { timeout: 110 }
    );
  });
});
