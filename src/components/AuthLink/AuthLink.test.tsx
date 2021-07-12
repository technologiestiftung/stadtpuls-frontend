import { AuthProvider } from "@auth/Auth";
import { supabase } from "@auth/supabase";
import * as userDataHook from "@lib/hooks/useUserData";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AuthLink } from ".";

const oldSessionFuncion = supabase.auth.session.bind(supabase.auth);
const oldLogoutFuncion = supabase.auth.signOut.bind(supabase.auth);

describe("component AuthLink while logged out", () => {
  it("should render Anmeldung by default", () => {
    render(<AuthLink />);
    const anmeldung = screen.getByText(/Anmeldung/gi);
    expect(anmeldung).toBeInTheDocument();
  });
  it("should render an icon", () => {
    render(<AuthLink />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
  it("should have gray styles by default", () => {
    render(<AuthLink />);
    const icon = document.querySelector("svg");
    const anmeldung = screen.getByText(/Anmeldung/gi);
    expect(icon?.getAttribute("class")?.includes("text-gray-400")).toBe(true);
    expect(anmeldung?.getAttribute("class")?.includes("text-black")).toBe(true);
  });
});

const originalUserDataHook = userDataHook.useUserData;
describe("component AuthLink while logged in", () => {
  beforeEach(() => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = jest.fn().mockReturnValue({
      user: { name: "JohnDoe" },
    });
  });

  afterEach(() => {
    supabase.auth.session = oldSessionFuncion;
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = originalUserDataHook;
    supabase.auth.signOut = oldLogoutFuncion;
  });
  it("should render the user username if logged in", async () => {
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );
    const username = screen.getByText(/JohnDoe/gi);

    await waitFor(() => expect(username).toBeInTheDocument());
  });
  it("should render the word Profile if logged in with empty username", async () => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = jest.fn().mockReturnValue({
      user: { name: "" },
    });
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );
    const username = screen.getByText(/Profil/gi);

    await waitFor(() => expect(username).toBeInTheDocument());
  });
  it("should have primary styles if logged in", async () => {
    render(<AuthLink />);
    const icon = document.querySelector("span");
    const anmeldung = screen.getByText(/JohnDoe/gi);

    await waitFor(() => {
      expect(icon?.getAttribute("class")?.includes("text-blue")).toBe(true);
      expect(anmeldung?.getAttribute("class")?.includes("text-blue")).toBe(
        true
      );
    });
  });
  it("should render the Dropdown menu links", async () => {
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );
    const projectsLink = screen.getByText(/Neues Projekt/gi);
    const accountLink = screen.getByText(/Account/gi);
    const logoutLink = screen.getByText(/Abmelden/gi);

    await waitFor(() => {
      expect(projectsLink).toBeInTheDocument();
      expect(accountLink).toBeInTheDocument();
      expect(logoutLink).toBeInTheDocument();
    });
  });
  it("should call auth's logout function on logout click", async () => {
    const signOutFunction = jest.fn();
    supabase.auth.signOut = signOutFunction;
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );

    const logoutLink = screen.getByText(/Abmelden/gi);
    fireEvent.click(logoutLink);

    await waitFor(() => expect(signOutFunction).toHaveBeenCalledTimes(1));
  });
});
