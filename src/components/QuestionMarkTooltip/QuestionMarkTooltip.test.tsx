import { render, screen } from "@testing-library/react";
import { QuestionMarkTooltip } from ".";

describe("QuestionMarkTooltip component", () => {
  it("should render its content", () => {
    render(<QuestionMarkTooltip content='I am tooltip content' />);
    const content = screen.getByText(/I am tooltip content/i);
    expect(content).toBeInTheDocument();
  });
});
