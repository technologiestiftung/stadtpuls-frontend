import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TokenItem } from ".";

const onRegenerateFunction = jest.fn();
const onInitiateDeleteFunction = jest.fn();

describe("TokenItem component", () => {
  it("displays the provided token description", () => {
    render(
      <TokenItem
        description='Super token'
        onRegenerate={onRegenerateFunction}
        onInitiateDelete={onInitiateDeleteFunction}
      />
    );

    const tokenDescription = screen.getByText("Super token");

    expect(tokenDescription).toBeInTheDocument();
  });
  it("calls a onRegenerate function on onRegenerate", () => {
    render(
      <TokenItem
        description='Super token'
        onRegenerate={onRegenerateFunction}
        onInitiateDelete={onInitiateDeleteFunction}
      />
    );

    userEvent.click(screen.getByLabelText(/Super token neu generieren/i));

    expect(onRegenerateFunction).toHaveBeenCalledTimes(1);
  });
  it("calls a onInitiateDeleteFunction function on onInitiateDeleteFunction", () => {
    render(
      <TokenItem
        description='Super token'
        onRegenerate={onRegenerateFunction}
        onInitiateDelete={onInitiateDeleteFunction}
      />
    );

    userEvent.click(screen.getByLabelText(/Super token löschen/i));

    expect(onInitiateDeleteFunction).toHaveBeenCalledTimes(1);
  });
});
