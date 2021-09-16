import { render, screen } from "@testing-library/react";
import { CopyTextField } from ".";

describe("CopyTextField component", () => {
  it("should render", () => {
    render(
      <CopyTextField name='name' label='label'>
        content
      </CopyTextField>
    );
    const input = screen.getByRole("textbox", { name: "label" });
    expect(input).toBeInTheDocument();
  });
});
