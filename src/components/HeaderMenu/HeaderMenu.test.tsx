import { fireEvent, render, screen } from "@testing-library/react";
import { FC } from "react";
import { HeaderMenu } from ".";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock(
  "next/link",
  (): FC =>
    function Link({ children }) {
      return <>{children}</>;
    }
);

describe("HeaderMenu component", () => {
  it("should render some links", () => {
    render(<HeaderMenu />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
  it("should toggle the menu when the hamburger icon is clicked", () => {
    render(<HeaderMenu />);
    const hamburgerIcon = screen.getByRole("button");
    fireEvent.click(hamburgerIcon);

    const menu = screen.getByRole("navigation");

    expect(menu.classList.contains("opacity-0")).toBe(false);

    fireEvent.click(hamburgerIcon);

    expect(menu.classList.contains("opacity-0")).toBe(true);
  });
  it("should close the menu when the home link is clicked", () => {
    render(<HeaderMenu />);
    const hamburgerIcon = screen.getByRole("button");
    fireEvent.click(hamburgerIcon);

    const homeLink = screen.getByRole("link", { name: "Startseite" });
    expect(homeLink).toBeInTheDocument();

    const menu = screen.getByRole("navigation");

    expect(menu.classList.contains("opacity-0")).toBe(false);

    fireEvent.click(homeLink);

    expect(menu.classList.contains("opacity-0")).toBe(true);
  });
  it("should close the menu when a link is clicked", () => {
    render(<HeaderMenu />);
    const hamburgerIcon = screen.getByRole("button");
    fireEvent.click(hamburgerIcon);

    const link = screen.getByRole("link", { name: "Projekte" });
    expect(link).toBeInTheDocument();

    const menu = screen.getByRole("navigation");

    expect(menu.classList.contains("opacity-0")).toBe(false);

    fireEvent.click(link);

    expect(menu.classList.contains("opacity-0")).toBe(true);
  });
});
