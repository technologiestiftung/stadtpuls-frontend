import { render, screen } from "@testing-library/react";
import { Dropdown } from ".";

describe("component Dropdown", () => {
  it("should render a button trigger and the content", () => {
    render(<Dropdown dropdownContent={<p>Content</p>}>Trigger</Dropdown>);
    const trigger = screen.getByRole("button");
    const content = screen.getByText("Content");
    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
