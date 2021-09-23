import { normalizeURL } from "@lib/urlUtil";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserInfoHeader } from ".";

const testProps = {
  id: "1",
  categories: [1, 2, 3],
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  link:
    "http://www.webanddata.com/login.aspx?url=http://mailflick.com/Home/Tools/tool?id=123",
  sensorsCount: 12345,
  recordsCount: 12345678,
};

describe("UserInfoHeader", () => {
  it("renders correctly", () => {
    const onEditButtonClick = jest.fn();
    render(
      <UserInfoHeader
        {...testProps}
        withEditButton
        onEditButtonClick={onEditButtonClick}
      />
    );
    const title = screen.getByRole("heading", {
      name: testProps.displayName,
    });
    const username = screen.getByText(`@${testProps.username}`);
    const description = screen.getByText(testProps.description);
    const link = screen.getByRole("link", {
      name: normalizeURL(testProps.link),
    });
    const sensorsCount = screen.queryByText("12.345");
    const recordsCount = screen.queryByText("12 Mio.");
    const editButton = screen.getByRole("button", {
      name: "Account editieren",
    });
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(sensorsCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(onEditButtonClick).toHaveBeenCalled();
  });
  it("renders the minimum", () => {
    render(
      <UserInfoHeader {...testProps} description={undefined} link={undefined} />
    );
    const title = screen.queryByRole("heading", {
      name: testProps.displayName,
    });
    const username = screen.queryByText(`@${testProps.username}`);
    const description = screen.queryByText(testProps.description);
    const link = screen.queryByRole("link", {
      name: normalizeURL(testProps.link),
    });
    const sensorsCount = screen.queryByText("12.345");
    const recordsCount = screen.queryByText("12 Mio.");
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(sensorsCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
  });
});
