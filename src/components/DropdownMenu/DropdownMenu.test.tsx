import { render, screen } from "@testing-library/react";
import { DropdownMenu } from ".";

describe("component DropdownMenu", () => {
  it("should render a button trigger and the content", () => {
    render(
      <DropdownMenu
        items={[
          { id: 1, title: "One", href: "/one" },
          { id: 2, title: "Two", onClick: jest.fn() },
        ]}
      >
        Trigger
      </DropdownMenu>
    );
    const trigger = screen.getByText("Trigger");
    const one = screen.getByText("One");
    const two = screen.getByText("Two");
    expect(trigger).toBeInTheDocument();
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
  });
});
