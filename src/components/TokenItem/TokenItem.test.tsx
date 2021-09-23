import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TokenItem } from ".";

const onRegenerateFunction = jest.fn();
const onDeleteFunction = jest.fn();

describe("TokenItem component", () => {
  it("displays the provided token name", () => {
    render(
      <TokenItem
        name='Super token'
        onRegenerate={onRegenerateFunction}
        onDelete={onDeleteFunction}
      />
    );

    const tokenName = screen.getByText("Super token");

    expect(tokenName).toBeInTheDocument();
  });
  it("calls a onRegenerate function on onRegenerate", () => {
    render(
      <TokenItem
        name='Super token'
        onRegenerate={onRegenerateFunction}
        onDelete={onDeleteFunction}
      />
    );

    userEvent.click(screen.getByLabelText(/Super token neu generieren/i));

    expect(onRegenerateFunction).toHaveBeenCalledTimes(1);
  });
  it("calls a onDeleteFunction function on onDeleteFunction", () => {
    render(
      <TokenItem
        name='Super token'
        onRegenerate={onRegenerateFunction}
        onDelete={onDeleteFunction}
      />
    );

    userEvent.click(screen.getByLabelText(/Super token löschen/i));

    expect(onDeleteFunction).toHaveBeenCalledTimes(1);
  });
});
