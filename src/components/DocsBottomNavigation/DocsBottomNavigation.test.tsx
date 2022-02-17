import { allPages } from "@components/DocsSidebar";
import { render, screen } from "@testing-library/react";
import * as nextRouter from "next/router";
import { DocsBottomNavigation } from ".";

describe("DocsBottomNavigation component", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      pathname: "/docs",
    }));
  });
  it("should render some links", () => {
    render(<DocsBottomNavigation page='faq' />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });
  it("should render the next and prev links", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      pathname: allPages[1].path,
    }));
    render(
      <DocsBottomNavigation page={allPages[1].path.replace("/docs/", "")} />
    );
    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe(allPages[0].path);
    expect(links[1].getAttribute("href")).toBe(allPages[2].path);
  });
  it("should render the last as prev if first page", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      pathname: allPages[0].path,
    }));
    render(
      <DocsBottomNavigation page={allPages[0].path.replace("/docs/", "")} />
    );
    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe(
      allPages[allPages.length - 1].path
    );
  });
  it("should render the first as next if last page", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      pathname: allPages[allPages.length - 1].path,
    }));
    render(
      <DocsBottomNavigation
        page={allPages[allPages.length - 1].path.replace("/docs/", "")}
      />
    );
    const links = screen.getAllByRole("link");
    expect(links[1].getAttribute("href")).toBe(allPages[0].path);
  });
  it("should render nothing if current page isn't found", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      pathname: "/unexisting-page",
    }));
    render(<DocsBottomNavigation page='unexisting-page' />);
    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(0);
  });
});
