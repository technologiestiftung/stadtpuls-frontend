import { render, screen } from "@testing-library/react";
import { TokenCreationModal } from ".";

const onCloseFunction = jest.fn();

describe("TokenCreationModal component", () => {
  it("renders a token and its description", () => {
    render(
      <TokenCreationModal
        tokenDescription='My first token'
        token='1234567'
        onClose={onCloseFunction}
      />
    );

    const tokenDescription = screen.getByText(/My first token/i);
    expect(tokenDescription).toBeInTheDocument();

    const token = screen.getByText(/1234567/i);
    expect(token).toBeInTheDocument();
  });
});
