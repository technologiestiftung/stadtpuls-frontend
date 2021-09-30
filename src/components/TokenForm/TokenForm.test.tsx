import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { TokenForm } from ".";

const onSubmitFunction = jest.fn();

describe("TokenForm component", () => {
  it("has a labelled input and submit button", () => {
    render(
      <TokenForm
        onSubmit={onSubmitFunction}
        submitMessage='Submit token'
        label='Token description'
        placeholder='Your token description here'
      />
    );

    const submitMessage = screen.getByRole("button", { name: /Submit token/i });
    expect(submitMessage).toBeInTheDocument();

    const label = screen.getByLabelText(/Token description/i);
    expect(label).toBeInTheDocument();

    const placeholder = screen.getByPlaceholderText(
      /Your token description here/i
    );
    expect(placeholder).toBeInTheDocument();
  });
});
