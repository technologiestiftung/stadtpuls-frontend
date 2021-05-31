import { render, screen } from "@testing-library/react";
import * as nextRouter from "next/router";
import { ActiveLink } from ".";

describe("ActiveLink component", () => {
  it("should add the active class to its anchor child if active", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      asPath: "/page-a",
    }));

    render(
      <ActiveLink activeClassName='active' href='/page-a'>
        <a href='/page-a'>Test Link</a>
      </ActiveLink>
    );
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toBeInTheDocument();
    expect(link.className).toBe("active");
  });
  it("should not add the active class to its anchor child if inactive", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      asPath: "/page-b",
    }));

    render(
      <ActiveLink activeClassName='active' href='/page-a'>
        <a href='/page-a'>Test Link</a>
      </ActiveLink>
    );
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toBeInTheDocument();
    expect(link.className).not.toBe("active");
  });
});
