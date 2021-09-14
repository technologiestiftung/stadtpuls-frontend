import { normalizeURL } from "@lib/urlUtil";
import { render, screen } from "@testing-library/react";
import { UserInfoHeader } from ".";

const testProps = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  link:
    "http://www.webanddata.com/login.aspx?url=http://mailflick.com/Home/Tools/tool?id=123",
  sensorsCount: 12,
  recordsCount: 11351256,
};

describe("UserInfoHeader", () => {
  it("renders correctly", () => {
    render(<UserInfoHeader {...testProps} />);
    const title = screen.getByRole("heading", {
      name: testProps.displayName,
    });
    const username = screen.getByText(`@${testProps.username}`);
    const description = screen.getByText(testProps.description);
    const link = screen.getByRole("link", {
      name: normalizeURL(testProps.link),
    });
    const sensorsCount = screen.getByText(testProps.sensorsCount);
    const recordsCount = screen.getByText(testProps.recordsCount);
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(sensorsCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
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
    const sensorsCount = screen.queryByText(testProps.sensorsCount);
    const recordsCount = screen.queryByText(testProps.recordsCount);
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(sensorsCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
  });
});
