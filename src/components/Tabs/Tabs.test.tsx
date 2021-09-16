import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs } from ".";

const testTabs = [
  { id: "a", name: "Ingredients", onClick: jest.fn() },
  { id: "b", name: "Instructions", onClick: jest.fn() },
  { id: "c", name: "Preparation" },
  { id: "d", name: "Serving", href: "/d" },
];

describe("Tabs component", () => {
  it("should render correctly", () => {
    render(<Tabs tabs={testTabs} activeTabIndex={1} />);
    const nav = screen.getByRole("navigation");
    const lis = screen.getAllByRole("listitem");
    const links = screen.getAllByRole("link");
    const buttons = screen.getAllByRole("button");
    const activeTabs = document.querySelectorAll(".border-gray-200");

    expect(nav).toBeInTheDocument();
    expect(lis).toHaveLength(4);
    expect(links).toHaveLength(1);
    expect(buttons).toHaveLength(2);
    expect(activeTabs).toHaveLength(1);

    fireEvent.click(buttons[0]);

    expect(testTabs[0].onClick).toHaveBeenCalled();
  });
});
