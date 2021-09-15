import { render, screen, fireEvent } from "@testing-library/react";
import { DropdownMenu } from ".";

describe("component DropdownMenu", () => {
  it("should render a button trigger and the content", () => {
    const onItemWithButtonClick = jest.fn();
    const onDisabledItemClick = jest.fn();
    render(
      <DropdownMenu
        items={[
          { id: 1, title: "One", href: "/one" },
          { id: 2, title: "Two", onClick: onItemWithButtonClick },
          {
            id: 3,
            title: "Three",
            onClick: onDisabledItemClick,
            disabled: true,
          },
        ]}
      >
        Trigger
      </DropdownMenu>
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });
    const one = screen.getByRole("link", { name: "One" });
    const two = screen.getByRole("button", { name: "Two" });
    const three = screen.getByText("Three");

    expect(trigger).toBeInTheDocument();
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
    expect(three).toBeInTheDocument();

    fireEvent.click(two);

    expect(onItemWithButtonClick).toHaveBeenCalledTimes(1);

    fireEvent.click(three);

    expect(onDisabledItemClick).not.toHaveBeenCalled();
  });
});
