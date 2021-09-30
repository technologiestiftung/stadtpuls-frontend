import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TokenDeletionModal } from ".";

const onDeleteFunction = jest.fn();
const onCancelFunction = jest.fn();

describe("TokenDeletionModal component", () => {
  it("renders a token description", () => {
    render(
      <TokenDeletionModal
        tokenDescription='My mistakenly generated token'
        onDelete={onDeleteFunction}
        onCancel={onCancelFunction}
      />
    );

    const tokenDescription = screen.getByText(/My mistakenly generated token/i);
    expect(tokenDescription).toBeInTheDocument();
  });
  it("calls an onCancel function onCancel", () => {
    render(
      <TokenDeletionModal
        tokenDescription='My correctly generated token'
        onDelete={onDeleteFunction}
        onCancel={onCancelFunction}
      />
    );

    userEvent.click(screen.getByRole("button", { name: /Abbrechen/i }));
    expect(onCancelFunction).toHaveBeenCalledTimes(1);
  });
  it("calls an onDelete function onDelete", () => {
    render(
      <TokenDeletionModal
        tokenDescription='My mistakenly generated token'
        onDelete={onDeleteFunction}
        onCancel={onCancelFunction}
      />
    );

    userEvent.click(screen.getByRole("button", { name: /Löschen/i }));
    expect(onDeleteFunction).toHaveBeenCalledTimes(1);
  });
});
