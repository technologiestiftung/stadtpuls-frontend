import { render, screen } from "@testing-library/react";
import { AccountCard, DESCRIPTION_MAX_LENGTH } from ".";

const testProps = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  sensorsCount: 12345,
  recordsCount: 12345678,
  categories: [1, 2, 3, 4, 5, 6],
};

describe("AccountCard component", () => {
  it("should render all elements", () => {
    render(<AccountCard {...testProps} />);
    const wrapperLink = screen.getByRole("link");
    const images = screen.getAllByRole("img");
    const name = screen.getByRole("heading", { name: testProps.displayName });
    const username = screen.getByText(`@${testProps.username}`);
    const description = screen.getByText(
      `${testProps.description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
    );
    const sensorsCount = screen.queryByText("12.345");
    const recordsCount = screen.queryByText("12 Mio.");

    expect(wrapperLink).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(sensorsCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
    expect(images).toHaveLength(6);
  });
});
