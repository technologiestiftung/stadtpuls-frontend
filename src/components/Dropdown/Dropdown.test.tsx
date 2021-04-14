import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from ".";

describe("component Dropdown", () => {
  it("should render a button trigger and the content", () => {
    render(<Dropdown dropdownContent={<p>Content</p>}>Trigger</Dropdown>);
    const trigger = screen.getByRole("button");
    const content = screen.getByText("Content");
    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
  it("should render a hidden dropdown when closed and visible when clicked", () => {
    render(<Dropdown dropdownContent={<p>Content</p>}>Trigger</Dropdown>);
    const trigger = screen.getByRole("button");
    const content = document.querySelector("section");
    expect(content?.getAttribute("class")?.includes("opacity-0")).toBe(true);
    fireEvent.click(trigger);
    expect(content?.getAttribute("class")?.includes("opacity-100")).toBe(true);
  });
  it("should be hidden when clicked outside", () => {
    render(
      <>
        <Dropdown dropdownContent={<p>Content</p>}>Trigger</Dropdown>
        <div>something else</div>
      </>
    );
    const trigger = screen.getByRole("button");
    const someThingElse = screen.getByText(/something else/gi);
    const content = document.querySelector("section");
    fireEvent.click(trigger);
    expect(content?.getAttribute("class")?.includes("opacity-100")).toBe(true);
    fireEvent.click(someThingElse);
    expect(content?.getAttribute("class")?.includes("opacity-0")).toBe(true);
  });
});
